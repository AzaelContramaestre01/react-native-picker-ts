import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native';

// Reanimated and Gesture Handler
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  SharedValue,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

// Local components/styles
import AnimatedItem from './components/AnimatedItem';
import styles from './styles/WheelPicker.styles';

const ITEM_HEIGHT = 50;

export type ActionButtonsPosition = 'top' | 'bottom';

export interface WheelPickerSelection {
  selectedYear: string | null;
  selectedMonth?: string | null;
  formattedDate?: string;
}

export type PickerMode = 'year' | 'month-year' | 'single' | 'dual' | 'triple';

export type WheelPickerValue =
  | Date
  | string
  | { selectedYear: string | null }
  | { left: string | null; center?: string | null; right?: string | null };

export interface WheelPickerProps {
  selectedDate?: string | Date;
  maximum?: number;
  minimum?: number;
  actionButtonsPosition?: ActionButtonsPosition;
  placeholder?: string;
  leftActionButtonText?: string;
  rightActionButtonText?: string;
  showCleaner?: boolean;
  dualWheel?: boolean;
  chosenYear?: string | null;
  months?: string[]; // Optional custom month labels
  onSelect: (selection: WheelPickerValue) => void;
  disabled?: boolean;
  renderCalendarIcon?: React.ReactNode;
  renderClearIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
  // Generic picker modes
  mode?: PickerMode; // default: based on dualWheel (back-compat)
  // Single list mode
  items?: string[];
  selectedItem?: string | null;
  // Dual list mode (e.g., Region/Comuna)
  leftItems?: string[];
  rightItems?: string[];
  getRightItems?: (left: string | null) => string[];
  selectedLeft?: string | null;
  selectedRight?: string | null;
  // Triple list mode
  centerItems?: string[];
  getCenterItems?: (left: string | null) => string[];
  getRightItemsFromCenter?: (center: string | null, left?: string | null) => string[];
  selectedCenter?: string | null;
  // Custom bottom actions
  renderFooterActions?: (ctx: { onCancel: () => void; onConfirm: () => void }) => React.ReactNode;
}

const DEFAULT_MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
].map((month) => (month.length > 3 ? `${month.slice(0, 3)}.` : month));

const WheelPicker: React.FC<WheelPickerProps> = ({
  selectedDate,
  maximum,
  minimum,
  actionButtonsPosition = 'bottom',
  leftActionButtonText = 'Cancelar',
  rightActionButtonText = 'Seleccionar',
  placeholder = 'Selecciona fecha',
  showCleaner = false,
  dualWheel = false,
  chosenYear,
  months = DEFAULT_MONTHS,
  onSelect,
  disabled = false,
  renderCalendarIcon,
  renderClearIcon,
  containerStyle,
  textStyle,
  iconContainerStyle,
  mode,
  items,
  selectedItem,
  leftItems,
  rightItems,
  getRightItems,
  selectedLeft,
  selectedRight,
  centerItems,
  getCenterItems,
  getRightItemsFromCenter,
  selectedCenter,
  renderFooterActions,
}) => {
  const resolvedMode: PickerMode = mode ?? (dualWheel ? 'month-year' : 'year');
  const currentYear = new Date().getFullYear();
  const effectiveStartYear = minimum ?? currentYear - 10;
  const effectiveFinishYear = maximum ?? currentYear;

  const monthsList = months;

  const [yearsList, setYearsList] = useState(
    Array.from({ length: effectiveFinishYear - effectiveStartYear + 1 }, (_, i) => (
      effectiveStartYear + i
    ).toString()),
  );

  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [tempSelectedYear, setTempSelectedYear] = useState(selectedYear);
  const [tempSelectedMonth, setTempSelectedMonth] = useState(selectedMonth);
  const [showModal, setShowModal] = useState(false);

  const chosenYearRef = useRef(chosenYear);

  useEffect(() => {
    chosenYearRef.current = chosenYear ?? null;
  }, [chosenYear]);

  // Refs and animated values
  const scrollYYear = useSharedValue(0);
  const scrollYMonth = useSharedValue(0);
  const scrollYLeft = useSharedValue(0);
  const scrollYCenter = useSharedValue(0);
  const scrollYRight = useSharedValue(0);
  const scrollViewRefYear = useRef<Animated.ScrollView | null>(null);
  const scrollViewRefMonth = useRef<Animated.ScrollView | null>(null);
  const scrollViewRefLeft = useRef<Animated.ScrollView | null>(null);
  const scrollViewRefCenter = useRef<Animated.ScrollView | null>(null);
  const scrollViewRefRight = useRef<Animated.ScrollView | null>(null);

  const scrollHandlerYear = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollYYear.value = event.contentOffset.y;
    },
  });

  const scrollHandlerMonth = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollYMonth.value = event.contentOffset.y;
    },
  });

  const scrollHandlerLeft = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollYLeft.value = event.contentOffset.y;
    },
  });
  const scrollHandlerCenter = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollYCenter.value = event.contentOffset.y;
    },
  });
  const scrollHandlerRight = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollYRight.value = event.contentOffset.y;
    },
  });

  const filteredMonthsList = React.useMemo(() => {
    if (tempSelectedYear && parseInt(tempSelectedYear, 10) === new Date().getFullYear()) {
      return monthsList.slice(0, new Date().getMonth() + 1);
    }
    return monthsList;
  }, [tempSelectedYear, monthsList]);

  // Cache day arrays for DatePicker to avoid recomputation on scroll
  const daysCacheRef = useRef<Map<string, string[]>>(new Map());

  // Generic mode states (single/dual)
  const [gPrimary, setGPrimary] = useState<string | null>(
    resolvedMode === 'single' ? selectedItem ?? null : resolvedMode === 'dual' ? selectedLeft ?? null : null,
  );
  const [gSecondary, setGSecondary] = useState<string | null>(
    resolvedMode === 'dual' ? selectedRight ?? null : null,
  );
  const genericPrimaryList = React.useMemo<string[]>(() => {
    if (resolvedMode === 'single') {
      return items ?? [];
    }
    if (resolvedMode === 'dual' || resolvedMode === 'triple') {
      return leftItems ?? [];
    }
    return [];
  }, [items, leftItems, resolvedMode]);
  const genericCenterList = React.useMemo<string[]>(() => {
    if (resolvedMode !== 'triple') return [];
    if (getCenterItems) return getCenterItems(gPrimary ?? null);
    return centerItems ?? [];
  }, [resolvedMode, getCenterItems, gPrimary, centerItems]);
  const genericSecondaryList = React.useMemo<string[]>(() => {
    if (resolvedMode === 'dual') {
      if (getRightItems) return getRightItems(gPrimary ?? null);
      return rightItems ?? [];
    }
    if (resolvedMode === 'triple') {
      if (getRightItemsFromCenter) return getRightItemsFromCenter(gSecondary ?? null, gPrimary ?? null);
      return rightItems ?? [];
    }
    return [];
  }, [resolvedMode, getRightItems, getRightItemsFromCenter, gPrimary, gSecondary, rightItems]);

  useEffect(() => {
    if (tempSelectedYear) {
      const parsedYear = parseInt(tempSelectedYear, 10);
      const nowYear = new Date().getFullYear();
      const nowMonth = new Date().getMonth();

      if (parsedYear === nowYear) {
        const filteredMonths = monthsList.filter((_, index) => index <= nowMonth);
        setTempSelectedMonth((prevMonth) =>
          filteredMonths.includes(prevMonth || '') ? prevMonth : filteredMonths[nowMonth],
        );
      } else {
        setTempSelectedMonth((prevMonth) =>
          monthsList.includes(prevMonth || '') ? prevMonth : monthsList[monthsList.length - 1],
        );
      }
    }
  }, [tempSelectedYear, monthsList]);

  useEffect(() => {
    if (!showModal) return;

    requestAnimationFrame(() => {
      if (resolvedMode === 'month-year') {
        const selectedIndexYear = (selectedYear ? yearsList.indexOf(selectedYear) : -1);
        const selectedIndexMonth = (selectedMonth ? monthsList.indexOf(selectedMonth) : -1);
        if (scrollViewRefYear.current && selectedIndexYear >= 0) {
          scrollViewRefYear.current.scrollTo({ y: selectedIndexYear * ITEM_HEIGHT, animated: true });
        }
        if (scrollViewRefMonth.current && selectedIndexMonth >= 0) {
          scrollViewRefMonth.current.scrollTo({ y: selectedIndexMonth * ITEM_HEIGHT, animated: true });
        }
        return;
      }

      if (resolvedMode === 'dual') {
        const leftIndex = gPrimary ? genericPrimaryList.indexOf(gPrimary) : -1;
        const rightIndex = gSecondary ? genericSecondaryList.indexOf(gSecondary) : -1;
        if (scrollViewRefMonth.current && leftIndex >= 0) {
          scrollViewRefMonth.current.scrollTo({ y: leftIndex * ITEM_HEIGHT, animated: true });
        }
        if (scrollViewRefYear.current && rightIndex >= 0) {
          scrollViewRefYear.current.scrollTo({ y: rightIndex * ITEM_HEIGHT, animated: true });
        }
        return;
      }

      if (resolvedMode === 'triple') {
        const leftIndex = gPrimary ? genericPrimaryList.indexOf(gPrimary) : -1;
        const centerIndex = gSecondary ? genericCenterList.indexOf(gSecondary) : -1;
        const rightIndex = (tempSelectedMonth ? genericSecondaryList.indexOf(tempSelectedMonth) : -1);
        if (scrollViewRefLeft.current && leftIndex >= 0) {
          scrollViewRefLeft.current.scrollTo({ y: leftIndex * ITEM_HEIGHT, animated: true });
        }
        if (scrollViewRefCenter.current && centerIndex >= 0) {
          scrollViewRefCenter.current.scrollTo({ y: centerIndex * ITEM_HEIGHT, animated: true });
        }
        if (scrollViewRefRight.current && rightIndex >= 0) {
          scrollViewRefRight.current.scrollTo({ y: rightIndex * ITEM_HEIGHT, animated: true });
        }
        return;
      }

      if (resolvedMode === 'year') {
        const selectedIndexYear = (selectedYear ? yearsList.indexOf(selectedYear) : -1);
        if (scrollViewRefYear.current && selectedIndexYear >= 0) {
          scrollViewRefYear.current.scrollTo({ y: selectedIndexYear * ITEM_HEIGHT, animated: true });
        }
      }
    });
  }, [showModal, resolvedMode, selectedYear, selectedMonth, yearsList, monthsList, gPrimary, gSecondary, genericPrimaryList, genericSecondaryList, genericCenterList]);

  useEffect(() => {
    if (resolvedMode === 'year' || resolvedMode === 'month-year') {
      if (selectedDate) {
        const date = new Date(selectedDate);
        const year = date.getFullYear().toString();
        const monthIndex = date.getMonth();
        setSelectedYear(year);
        setSelectedMonth(monthsList[monthIndex]);
        setTempSelectedYear(year);
        setTempSelectedMonth(monthsList[monthIndex]);
      } else {
        setTempSelectedYear(null);
        setTempSelectedMonth(null);
      }
    } else if (resolvedMode === 'single') {
      setGPrimary(selectedItem ?? null);
    } else if (resolvedMode === 'dual' || resolvedMode === 'triple') {
      setGPrimary(selectedLeft ?? null);
      setGSecondary(resolvedMode === 'triple' ? selectedCenter ?? null : selectedRight ?? null);
    }
  }, [resolvedMode, selectedDate, monthsList, selectedItem, selectedLeft, selectedRight]);

  useEffect(() => {
    const minY = effectiveStartYear;
    const maxY = effectiveFinishYear;

    const updatedYearsList = Array.from(
      { length: Math.min(10, maxY - minY + 1) },
      (_, i) => (minY + i).toString(),
    );
    setYearsList(updatedYearsList);

    setSelectedYear((current) => {
      if (current && (parseInt(current, 10) < minY || parseInt(current, 10) > maxY)) {
        return null;
      }
      return current;
    });

    if (resolvedMode === 'month-year') {
      const parsedYear = parseInt(selectedYear || `${currentYear}`, 10);
      const now = new Date();

      if (parsedYear === now.getFullYear()) {
        const updatedMonths = monthsList.slice(0, now.getMonth() + 1);
        if (!updatedMonths.includes(selectedMonth || '')) {
          setSelectedMonth(null);
        }
      }
    }
  }, [effectiveStartYear, effectiveFinishYear, selectedYear, selectedMonth, resolvedMode, currentYear, monthsList]);

  const onHandleCloseModal = useCallback(() => {
    // discard temporary changes; keep committed selection
    setTempSelectedYear(selectedYear);
    setTempSelectedMonth(selectedMonth);
    setShowModal(false);
  }, [selectedMonth, selectedYear]);

  const onHandleSelect = useCallback(() => {
    if (resolvedMode === 'year') {
      setSelectedYear(tempSelectedYear);
      onSelect({ selectedYear: tempSelectedYear });
    } else if (resolvedMode === 'month-year') {
      setSelectedYear(tempSelectedYear);
      setSelectedMonth(tempSelectedMonth);
      const year = tempSelectedYear;
      const monthIndex = tempSelectedMonth ? monthsList.indexOf(tempSelectedMonth) : 0;
      const date = new Date(Number(year), monthIndex, 1, 0, 0, 0);
      onSelect(date);
    } else if (resolvedMode === 'single') {
      setGPrimary((prev) => prev);
      onSelect(gPrimary ?? '');
    } else if (resolvedMode === 'dual') {
      setGPrimary((prev) => prev);
      setGSecondary((prev) => prev);
      onSelect({ left: gPrimary ?? null, right: gSecondary ?? null });
    } else if (resolvedMode === 'triple') {
      setGPrimary((prev) => prev);
      setGSecondary((prev) => prev);
      onSelect({ left: gPrimary ?? null, center: gSecondary ?? null, right: (tempSelectedMonth ?? null) });
    }
    setShowModal(false);
  }, [resolvedMode, tempSelectedYear, tempSelectedMonth, monthsList, onSelect, gPrimary, gSecondary]);

  const onHandleClearSelection = useCallback(() => {
    if (resolvedMode === 'year' || resolvedMode === 'month-year') {
      setTempSelectedYear(yearsList[yearsList.length - 1]);
      setTempSelectedMonth(resolvedMode === 'month-year' ? monthsList[new Date().getMonth()] : null);
      setSelectedYear(null);
      setSelectedMonth(null);
      chosenYearRef.current = null;
    } else if (resolvedMode === 'single') {
      setGPrimary(null);
    } else if (resolvedMode === 'dual' || resolvedMode === 'triple') {
      setGPrimary(null);
      setGSecondary(null);
    }
    onHandleSelect();
  }, [resolvedMode, monthsList, onHandleSelect, yearsList]);

  const handleToggleShow = useCallback(() => {
    if (!disabled) {
      setShowModal(!showModal);
    }
  }, [showModal, disabled]);

  const renderWheel = useCallback((
    data: string[],
    setSelectedValue: (value: string) => void,
    scrollY: SharedValue<number>,
    ref: React.RefObject<Animated.ScrollView | null>,
  ) => {
    try {
      return (
        <PanGestureHandler>
          <Animated.ScrollView
            ref={ref}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onScroll={
              scrollY === scrollYYear
                ? scrollHandlerYear
                : scrollY === scrollYMonth
                ? scrollHandlerMonth
                : scrollY === scrollYLeft
                ? scrollHandlerLeft
                : scrollY === scrollYCenter
                ? scrollHandlerCenter
                : scrollHandlerRight
            }
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
              setSelectedValue(data[index]);
            }}
          >
            {data.map((item, index) => (
              <AnimatedItem key={`${item}-${index}`} index={index} item={item} scrollY={scrollY} />
            ))}
          </Animated.ScrollView>
        </PanGestureHandler>
      );
    } catch (error) {
      console.error('Error in renderWheel:', error);
      return <></>;
    }
  }, [scrollHandlerMonth, scrollHandlerYear, scrollYYear]);

  const displayText = React.useMemo(() => {
    if (resolvedMode === 'year' || resolvedMode === 'month-year') {
      if (chosenYearRef.current !== null && chosenYearRef.current !== undefined && chosenYearRef.current !== '') {
        return chosenYearRef.current as string;
      }
      if (resolvedMode === 'month-year' && tempSelectedYear && tempSelectedMonth) {
        return `${tempSelectedMonth} ${tempSelectedYear}`;
      }
      if (resolvedMode === 'year' && tempSelectedYear) return String(tempSelectedYear);
      return placeholder;
    }
    if (resolvedMode === 'single') {
      return gPrimary ?? placeholder;
    }
    if (resolvedMode === 'dual') {
      if (gPrimary && gSecondary) return `${gPrimary} - ${gSecondary}`;
      if (gPrimary) return gPrimary;
      return placeholder;
    }
    if (resolvedMode === 'triple') {
      const third = tempSelectedMonth ?? null;
      const parts = [gPrimary, gSecondary, third].filter(Boolean) as string[];
      return parts.length ? parts.join(' - ') : placeholder;
    }
    return placeholder;
  }, [resolvedMode, chosenYearRef.current, tempSelectedYear, tempSelectedMonth, gPrimary, gSecondary, placeholder]);

  return (
    <View style={styles.root}>
      <Pressable
        onPress={handleToggleShow}
        style={[styles.infoDate, disabled && styles.disabledContainer, containerStyle]}
        pointerEvents={disabled ? 'none' : 'auto'}
      >
        <Text style={[styles.date, disabled && styles.disabledText, textStyle]}>{displayText}</Text>
        <View style={[styles.iconContainer, iconContainerStyle]}>
          {showCleaner && chosenYearRef.current && !disabled ? (
            <TouchableOpacity onPress={onHandleClearSelection}>
              {renderClearIcon ?? <Text style={styles.iconText}>✕</Text>}
            </TouchableOpacity>
          ) : (
            renderCalendarIcon ?? <Text style={[styles.iconText, disabled && styles.disabledIcon]}>🗓️</Text>
          )}
        </View>
      </Pressable>

      <Modal visible={showModal} transparent animationType="fade" onRequestClose={onHandleCloseModal}>
        <View style={styles.modalOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onHandleCloseModal} />
          <View style={styles.modalContent}>
            {actionButtonsPosition === 'top' && (
              <View style={dualWheel ? styles.dualActionButtons : styles.actionButtons}>
                <TouchableOpacity onPress={onHandleCloseModal}>
                  <Text style={styles.actionText}>{leftActionButtonText}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onHandleSelect}>
                  <Text style={styles.actionText}>{rightActionButtonText}</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.wheelContainer}>
              {resolvedMode === 'month-year' && (
                <View style={[styles.wheelRowLeft, styles.wheelColumn]}>
                  <View style={styles.selectionOverlay} pointerEvents="none" />
                  {renderWheel(filteredMonthsList, setTempSelectedMonth as any, scrollYMonth, scrollViewRefMonth)}
                </View>
              )}
              {resolvedMode === 'year' && (
                <View style={[styles.wheelRow, styles.wheelColumn]}>
                  <View style={styles.selectionOverlay} pointerEvents="none" />
                  {renderWheel(yearsList, (val) => setTempSelectedYear(val), scrollYYear, scrollViewRefYear)}
                </View>
              )}
              {resolvedMode === 'month-year' && (
                <View style={[styles.wheelRowRight, styles.wheelColumn]}>
                  <View style={styles.selectionOverlay} pointerEvents="none" />
                  {renderWheel(yearsList, (val) => setTempSelectedYear(val), scrollYYear, scrollViewRefYear)}
                </View>
              )}
              {resolvedMode === 'single' && (
                <View style={[styles.wheelRow, styles.wheelColumn]}>
                  <View style={styles.selectionOverlay} pointerEvents="none" />
                  {renderWheel(genericPrimaryList, (val) => setGPrimary(val), scrollYYear, scrollViewRefYear)}
                </View>
              )}
              {resolvedMode === 'dual' && (
                <>
                  <View style={[styles.wheelRowLeft, styles.wheelColumn]}>
                    <View style={styles.selectionOverlay} pointerEvents="none" />
                    {renderWheel(genericPrimaryList, (val) => setGPrimary(val), scrollYMonth, scrollViewRefMonth)}
                  </View>
                  <View style={[styles.wheelRowRight, styles.wheelColumn]}>
                    <View style={styles.selectionOverlay} pointerEvents="none" />
                    {renderWheel(genericSecondaryList, (val) => setGSecondary(val), scrollYYear, scrollViewRefYear)}
                  </View>
                </>
              )}
              {resolvedMode === 'triple' && (
                <>
                  <View style={[styles.wheelRowLeft, styles.wheelColumn]}>
                    <View style={styles.selectionOverlay} pointerEvents="none" />
                    {renderWheel(genericPrimaryList, (val) => setGPrimary(val), scrollYLeft, scrollViewRefLeft)}
                  </View>
                  <View style={[styles.wheelRow, styles.wheelColumn]}>
                    <View style={styles.selectionOverlay} pointerEvents="none" />
                    {renderWheel(genericCenterList, (val) => setGSecondary(val), scrollYCenter, scrollViewRefCenter)}
                  </View>
                  <View style={[styles.wheelRowRight, styles.wheelColumn]}>
                    <View style={styles.selectionOverlay} pointerEvents="none" />
                    {renderWheel(genericSecondaryList, (val) => setTempSelectedMonth(val), scrollYRight, scrollViewRefRight)}
                  </View>
                </>
              )}
            </View>
            {renderFooterActions ? (
              renderFooterActions({ onCancel: onHandleCloseModal, onConfirm: onHandleSelect })
            ) : (
              actionButtonsPosition === 'bottom' && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity onPress={onHandleCloseModal}>
                    <Text style={styles.actionText}>{leftActionButtonText}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onHandleSelect}>
                    <Text style={styles.actionText}>{rightActionButtonText}</Text>
                  </TouchableOpacity>
                </View>
              )
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WheelPicker;


