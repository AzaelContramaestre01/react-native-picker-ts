// src/WheelPicker.tsx
import React2, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, TouchableOpacity, Modal, Pressable, StyleSheet as StyleSheet3 } from "react-native";
import Animated2, {
  useAnimatedScrollHandler,
  useSharedValue
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

// src/components/AnimatedItem.tsx
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolation
} from "react-native-reanimated";

// src/components/AnimatedItem.styles.ts
import { StyleSheet } from "react-native";
var ITEM_HEIGHT = 50;
var styles = StyleSheet.create({
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  itemText: {
    fontSize: 22,
    color: "#111",
    opacity: 0.6
  }
});
var AnimatedItem_styles_default = styles;

// src/components/AnimatedItem.tsx
import { useMemo } from "react";
import { jsx } from "react/jsx-runtime";
var ITEM_HEIGHT2 = 50;
var AnimatedItem = ({ index, scrollY, item }) => {
  const fontSizeStyle = useMemo(() => {
    var _a;
    const length = (_a = item == null ? void 0 : item.length) != null ? _a : 0;
    let fontSize = 22;
    if (length > 18) fontSize = 14;
    else if (length > 14) fontSize = 16;
    else if (length > 10) fontSize = 18;
    return { fontSize };
  }, [item]);
  const animatedStyle = useAnimatedStyle(() => {
    const position = index * ITEM_HEIGHT2;
    const scale = interpolate(
      scrollY.value,
      [
        position - ITEM_HEIGHT2 * 2,
        position - ITEM_HEIGHT2,
        position,
        position + ITEM_HEIGHT2,
        position + ITEM_HEIGHT2 * 2
      ],
      [0.8, 0.98, 1.2, 0.98, 0.8],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      scrollY.value,
      [position - ITEM_HEIGHT2, position, position + ITEM_HEIGHT2],
      [0.4, 1, 0.4],
      Extrapolation.CLAMP
    );
    return { transform: [{ scale }], opacity };
  });
  return /* @__PURE__ */ jsx(Animated.View, { style: [AnimatedItem_styles_default.itemContainer, animatedStyle], children: /* @__PURE__ */ jsx(Animated.Text, { style: [AnimatedItem_styles_default.itemText, fontSizeStyle, animatedStyle], numberOfLines: 1, children: item }) });
};
var AnimatedItem_default = React.memo(AnimatedItem);

// src/styles/WheelPicker.styles.ts
import { StyleSheet as StyleSheet2 } from "react-native";
var ITEM_HEIGHT3 = 50;
var wheelPickerStyles = StyleSheet2.create({
  root: {
    flex: 1
  },
  infoDate: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 16,
    paddingVertical: 13,
    justifyContent: "space-between",
    marginBottom: 16,
    borderRadius: 4,
    backgroundColor: "white"
  },
  date: {
    color: "#262626",
    lineHeight: 24,
    fontSize: 16
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconText: {
    fontSize: 18
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)"
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 20,
    alignItems: "center",
    position: "absolute",
    bottom: 0
  },
  wheelContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: ITEM_HEIGHT3 * 5,
    paddingHorizontal: 40
  },
  wheelColumn: {
    flex: 1,
    position: "relative"
  },
  selectionOverlay: {
    position: "absolute",
    top: ITEM_HEIGHT3 * 2,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT3,
    backgroundColor: "#e0e0e0",
    borderRadius: 10
  },
  centeredSelectionBackground: {
    position: "absolute",
    top: ITEM_HEIGHT3 * 2,
    left: "35%",
    right: "35%",
    height: ITEM_HEIGHT3,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    zIndex: -1
  },
  leftSelectionBackground: {
    top: ITEM_HEIGHT3 * 2,
    left: "8%",
    right: "75%"
  },
  middleSelectionBackground: {
    top: ITEM_HEIGHT3 * 2,
    left: "38%",
    right: "38%"
  },
  rightSelectionBackground: {
    top: ITEM_HEIGHT3 * 2,
    left: "72%",
    right: "8%"
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 40,
    marginVertical: 10
  },
  dualActionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 60,
    marginVertical: 10
  },
  actionText: {
    fontSize: 18,
    color: "#007aff",
    fontWeight: "600"
  },
  disabledContainer: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc"
  },
  disabledText: {
    color: "#a0a0a0"
  },
  disabledIcon: {
    opacity: 0.5
  },
  wheelRow: {
    flex: 1
  },
  wheelRowLeft: {
    flex: 1,
    marginRight: 5
  },
  wheelRowRight: {
    flex: 1,
    marginLeft: 5
  }
});
var WheelPicker_styles_default = wheelPickerStyles;

// src/WheelPicker.tsx
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var ITEM_HEIGHT4 = 50;
var DEFAULT_MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
].map((month) => month.length > 3 ? `${month.slice(0, 3)}.` : month);
var WheelPicker = ({
  selectedDate,
  maximum,
  minimum,
  actionButtonsPosition = "bottom",
  leftActionButtonText = "Cancelar",
  rightActionButtonText = "Seleccionar",
  placeholder = "Selecciona fecha",
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
  renderTrigger
}) => {
  const resolvedMode = mode != null ? mode : dualWheel ? "month-year" : "year";
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const effectiveStartYear = minimum != null ? minimum : currentYear - 10;
  const effectiveFinishYear = maximum != null ? maximum : currentYear;
  const monthsList = months;
  const [yearsList, setYearsList] = useState(
    Array.from({ length: effectiveFinishYear - effectiveStartYear + 1 }, (_, i) => (effectiveStartYear + i).toString())
  );
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [tempSelectedYear, setTempSelectedYear] = useState(selectedYear);
  const [tempSelectedMonth, setTempSelectedMonth] = useState(selectedMonth);
  const [showModal, setShowModal] = useState(false);
  const chosenYearRef = useRef(chosenYear);
  useEffect(() => {
    chosenYearRef.current = chosenYear != null ? chosenYear : null;
  }, [chosenYear]);
  const scrollYYear = useSharedValue(0);
  const scrollYMonth = useSharedValue(0);
  const scrollYLeft = useSharedValue(0);
  const scrollYCenter = useSharedValue(0);
  const scrollYRight = useSharedValue(0);
  const scrollViewRefYear = useRef(null);
  const scrollViewRefMonth = useRef(null);
  const scrollViewRefLeft = useRef(null);
  const scrollViewRefCenter = useRef(null);
  const scrollViewRefRight = useRef(null);
  const scrollHandlerYear = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollYYear.value = event.contentOffset.y;
    }
  });
  const scrollHandlerMonth = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollYMonth.value = event.contentOffset.y;
    }
  });
  const scrollHandlerLeft = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollYLeft.value = event.contentOffset.y;
    }
  });
  const scrollHandlerCenter = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollYCenter.value = event.contentOffset.y;
    }
  });
  const scrollHandlerRight = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollYRight.value = event.contentOffset.y;
    }
  });
  const filteredMonthsList = React2.useMemo(() => {
    if (tempSelectedYear && parseInt(tempSelectedYear, 10) === (/* @__PURE__ */ new Date()).getFullYear()) {
      return monthsList.slice(0, (/* @__PURE__ */ new Date()).getMonth() + 1);
    }
    return monthsList;
  }, [tempSelectedYear, monthsList]);
  const daysCacheRef = useRef(/* @__PURE__ */ new Map());
  const [gPrimary, setGPrimary] = useState(
    resolvedMode === "single" ? selectedItem != null ? selectedItem : null : resolvedMode === "dual" ? selectedLeft != null ? selectedLeft : null : null
  );
  const [gSecondary, setGSecondary] = useState(
    resolvedMode === "dual" ? selectedRight != null ? selectedRight : null : null
  );
  const genericPrimaryList = React2.useMemo(() => {
    if (resolvedMode === "single") {
      return items != null ? items : [];
    }
    if (resolvedMode === "dual" || resolvedMode === "triple") {
      return leftItems != null ? leftItems : [];
    }
    return [];
  }, [items, leftItems, resolvedMode]);
  const genericCenterList = React2.useMemo(() => {
    if (resolvedMode !== "triple") return [];
    if (getCenterItems) return getCenterItems(gPrimary != null ? gPrimary : null);
    return centerItems != null ? centerItems : [];
  }, [resolvedMode, getCenterItems, gPrimary, centerItems]);
  const genericSecondaryList = React2.useMemo(() => {
    if (resolvedMode === "dual") {
      if (getRightItems) return getRightItems(gPrimary != null ? gPrimary : null);
      return rightItems != null ? rightItems : [];
    }
    if (resolvedMode === "triple") {
      if (getRightItemsFromCenter) return getRightItemsFromCenter(gSecondary != null ? gSecondary : null, gPrimary != null ? gPrimary : null);
      return rightItems != null ? rightItems : [];
    }
    return [];
  }, [resolvedMode, getRightItems, getRightItemsFromCenter, gPrimary, gSecondary, rightItems]);
  useEffect(() => {
    if (tempSelectedYear) {
      const parsedYear = parseInt(tempSelectedYear, 10);
      const nowYear = (/* @__PURE__ */ new Date()).getFullYear();
      const nowMonth = (/* @__PURE__ */ new Date()).getMonth();
      if (parsedYear === nowYear) {
        const filteredMonths = monthsList.filter((_, index) => index <= nowMonth);
        setTempSelectedMonth(
          (prevMonth) => filteredMonths.includes(prevMonth || "") ? prevMonth : filteredMonths[nowMonth]
        );
      } else {
        setTempSelectedMonth(
          (prevMonth) => monthsList.includes(prevMonth || "") ? prevMonth : monthsList[monthsList.length - 1]
        );
      }
    }
  }, [tempSelectedYear, monthsList]);
  useEffect(() => {
    if (!showModal) return;
    requestAnimationFrame(() => {
      if (resolvedMode === "month-year") {
        const selectedIndexYear = selectedYear ? yearsList.indexOf(selectedYear) : -1;
        const selectedIndexMonth = selectedMonth ? monthsList.indexOf(selectedMonth) : -1;
        if (scrollViewRefYear.current && selectedIndexYear >= 0) {
          scrollViewRefYear.current.scrollTo({ y: selectedIndexYear * ITEM_HEIGHT4, animated: true });
        }
        if (scrollViewRefMonth.current && selectedIndexMonth >= 0) {
          scrollViewRefMonth.current.scrollTo({ y: selectedIndexMonth * ITEM_HEIGHT4, animated: true });
        }
        return;
      }
      if (resolvedMode === "dual") {
        const leftIndex = gPrimary ? genericPrimaryList.indexOf(gPrimary) : -1;
        const rightIndex = gSecondary ? genericSecondaryList.indexOf(gSecondary) : -1;
        if (scrollViewRefMonth.current && leftIndex >= 0) {
          scrollViewRefMonth.current.scrollTo({ y: leftIndex * ITEM_HEIGHT4, animated: true });
        }
        if (scrollViewRefYear.current && rightIndex >= 0) {
          scrollViewRefYear.current.scrollTo({ y: rightIndex * ITEM_HEIGHT4, animated: true });
        }
        return;
      }
      if (resolvedMode === "triple") {
        const leftIndex = gPrimary ? genericPrimaryList.indexOf(gPrimary) : -1;
        const centerIndex = gSecondary ? genericCenterList.indexOf(gSecondary) : -1;
        const rightIndex = tempSelectedMonth ? genericSecondaryList.indexOf(tempSelectedMonth) : -1;
        if (scrollViewRefLeft.current && leftIndex >= 0) {
          scrollViewRefLeft.current.scrollTo({ y: leftIndex * ITEM_HEIGHT4, animated: true });
        }
        if (scrollViewRefCenter.current && centerIndex >= 0) {
          scrollViewRefCenter.current.scrollTo({ y: centerIndex * ITEM_HEIGHT4, animated: true });
        }
        if (scrollViewRefRight.current && rightIndex >= 0) {
          scrollViewRefRight.current.scrollTo({ y: rightIndex * ITEM_HEIGHT4, animated: true });
        }
        return;
      }
      if (resolvedMode === "year") {
        const selectedIndexYear = selectedYear ? yearsList.indexOf(selectedYear) : -1;
        if (scrollViewRefYear.current && selectedIndexYear >= 0) {
          scrollViewRefYear.current.scrollTo({ y: selectedIndexYear * ITEM_HEIGHT4, animated: true });
        }
      }
    });
  }, [showModal, resolvedMode, selectedYear, selectedMonth, yearsList, monthsList, gPrimary, gSecondary, genericPrimaryList, genericSecondaryList, genericCenterList]);
  useEffect(() => {
    if (resolvedMode === "year" || resolvedMode === "month-year") {
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
    } else if (resolvedMode === "single") {
      setGPrimary(selectedItem != null ? selectedItem : null);
    } else if (resolvedMode === "dual" || resolvedMode === "triple") {
      setGPrimary(selectedLeft != null ? selectedLeft : null);
      setGSecondary(resolvedMode === "triple" ? selectedCenter != null ? selectedCenter : null : selectedRight != null ? selectedRight : null);
    }
  }, [resolvedMode, selectedDate, monthsList, selectedItem, selectedLeft, selectedRight]);
  useEffect(() => {
    const minY = effectiveStartYear;
    const maxY = effectiveFinishYear;
    const updatedYearsList = Array.from(
      { length: Math.min(10, maxY - minY + 1) },
      (_, i) => (minY + i).toString()
    );
    setYearsList(updatedYearsList);
    setSelectedYear((current) => {
      if (current && (parseInt(current, 10) < minY || parseInt(current, 10) > maxY)) {
        return null;
      }
      return current;
    });
    if (resolvedMode === "month-year") {
      const parsedYear = parseInt(selectedYear || `${currentYear}`, 10);
      const now = /* @__PURE__ */ new Date();
      if (parsedYear === now.getFullYear()) {
        const updatedMonths = monthsList.slice(0, now.getMonth() + 1);
        if (!updatedMonths.includes(selectedMonth || "")) {
          setSelectedMonth(null);
        }
      }
    }
  }, [effectiveStartYear, effectiveFinishYear, selectedYear, selectedMonth, resolvedMode, currentYear, monthsList]);
  const onHandleCloseModal = useCallback(() => {
    setTempSelectedYear(selectedYear);
    setTempSelectedMonth(selectedMonth);
    setShowModal(false);
  }, [selectedMonth, selectedYear]);
  const onHandleSelect = useCallback(() => {
    if (resolvedMode === "year") {
      setSelectedYear(tempSelectedYear);
      onSelect({ selectedYear: tempSelectedYear });
    } else if (resolvedMode === "month-year") {
      setSelectedYear(tempSelectedYear);
      setSelectedMonth(tempSelectedMonth);
      const year = tempSelectedYear;
      const monthIndex = tempSelectedMonth ? monthsList.indexOf(tempSelectedMonth) : 0;
      const date = new Date(Number(year), monthIndex, 1, 0, 0, 0);
      onSelect(date);
    } else if (resolvedMode === "single") {
      setGPrimary((prev) => prev);
      onSelect(gPrimary != null ? gPrimary : "");
    } else if (resolvedMode === "dual") {
      setGPrimary((prev) => prev);
      setGSecondary((prev) => prev);
      onSelect({ left: gPrimary != null ? gPrimary : null, right: gSecondary != null ? gSecondary : null });
    } else if (resolvedMode === "triple") {
      setGPrimary((prev) => prev);
      setGSecondary((prev) => prev);
      onSelect({ left: gPrimary != null ? gPrimary : null, center: gSecondary != null ? gSecondary : null, right: tempSelectedMonth != null ? tempSelectedMonth : null });
    }
    setShowModal(false);
  }, [resolvedMode, tempSelectedYear, tempSelectedMonth, monthsList, onSelect, gPrimary, gSecondary]);
  const onHandleClearSelection = useCallback(() => {
    if (resolvedMode === "year" || resolvedMode === "month-year") {
      setTempSelectedYear(yearsList[yearsList.length - 1]);
      setTempSelectedMonth(resolvedMode === "month-year" ? monthsList[(/* @__PURE__ */ new Date()).getMonth()] : null);
      setSelectedYear(null);
      setSelectedMonth(null);
      chosenYearRef.current = null;
    } else if (resolvedMode === "single") {
      setGPrimary(null);
    } else if (resolvedMode === "dual" || resolvedMode === "triple") {
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
  const setYearRef = useCallback((node) => {
    scrollViewRefYear.current = node;
  }, []);
  const setMonthRef = useCallback((node) => {
    scrollViewRefMonth.current = node;
  }, []);
  const setLeftRef = useCallback((node) => {
    scrollViewRefLeft.current = node;
  }, []);
  const setCenterRef = useCallback((node) => {
    scrollViewRefCenter.current = node;
  }, []);
  const setRightRef = useCallback((node) => {
    scrollViewRefRight.current = node;
  }, []);
  const renderWheel = useCallback((data, setSelectedValue, scrollY, refCb) => {
    try {
      return /* @__PURE__ */ jsx2(PanGestureHandler, { children: /* @__PURE__ */ jsx2(
        Animated2.ScrollView,
        {
          ref: refCb,
          showsVerticalScrollIndicator: false,
          snapToInterval: ITEM_HEIGHT4,
          decelerationRate: "fast",
          onScroll: scrollY === scrollYYear ? scrollHandlerYear : scrollY === scrollYMonth ? scrollHandlerMonth : scrollY === scrollYLeft ? scrollHandlerLeft : scrollY === scrollYCenter ? scrollHandlerCenter : scrollHandlerRight,
          scrollEventThrottle: 16,
          contentContainerStyle: { paddingVertical: ITEM_HEIGHT4 * 2 },
          onMomentumScrollEnd: (event) => {
            const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT4);
            setSelectedValue(data[index]);
          },
          children: data.map((item, index) => /* @__PURE__ */ jsx2(AnimatedItem_default, { index, item, scrollY }, `${item}-${index}`))
        }
      ) });
    } catch (error) {
      console.error("Error in renderWheel:", error);
      return /* @__PURE__ */ jsx2(Fragment, {});
    }
  }, [scrollHandlerMonth, scrollHandlerYear, scrollYYear]);
  const displayText = React2.useMemo(() => {
    if (resolvedMode === "year" || resolvedMode === "month-year") {
      if (chosenYearRef.current !== null && chosenYearRef.current !== void 0 && chosenYearRef.current !== "") {
        return chosenYearRef.current;
      }
      if (resolvedMode === "month-year" && tempSelectedYear && tempSelectedMonth) {
        return `${tempSelectedMonth} ${tempSelectedYear}`;
      }
      if (resolvedMode === "year" && tempSelectedYear) return String(tempSelectedYear);
      return placeholder;
    }
    if (resolvedMode === "single") {
      return gPrimary != null ? gPrimary : placeholder;
    }
    if (resolvedMode === "dual") {
      if (gPrimary && gSecondary) return `${gPrimary} - ${gSecondary}`;
      if (gPrimary) return gPrimary;
      return placeholder;
    }
    if (resolvedMode === "triple") {
      const third = tempSelectedMonth != null ? tempSelectedMonth : null;
      const parts = [gPrimary, gSecondary, third].filter(Boolean);
      return parts.length ? parts.join(" - ") : placeholder;
    }
    return placeholder;
  }, [resolvedMode, chosenYearRef.current, tempSelectedYear, tempSelectedMonth, gPrimary, gSecondary, placeholder]);
  return /* @__PURE__ */ jsxs(View, { style: WheelPicker_styles_default.root, children: [
    renderTrigger ? renderTrigger({
      open: handleToggleShow,
      displayText,
      disabled,
      onClear: onHandleClearSelection,
      showCleaner: !!(showCleaner && chosenYearRef.current && !disabled)
    }) : /* @__PURE__ */ jsxs(
      Pressable,
      {
        onPress: handleToggleShow,
        style: [WheelPicker_styles_default.infoDate, disabled && WheelPicker_styles_default.disabledContainer, containerStyle],
        pointerEvents: disabled ? "none" : "auto",
        children: [
          /* @__PURE__ */ jsx2(Text, { style: [WheelPicker_styles_default.date, disabled && WheelPicker_styles_default.disabledText, textStyle], children: displayText }),
          /* @__PURE__ */ jsx2(View, { style: [WheelPicker_styles_default.iconContainer, iconContainerStyle], children: showCleaner && chosenYearRef.current && !disabled ? /* @__PURE__ */ jsx2(TouchableOpacity, { onPress: onHandleClearSelection, children: renderClearIcon != null ? renderClearIcon : /* @__PURE__ */ jsx2(Text, { style: WheelPicker_styles_default.iconText, children: "\u2715" }) }) : renderCalendarIcon != null ? renderCalendarIcon : /* @__PURE__ */ jsx2(Text, { style: [WheelPicker_styles_default.iconText, disabled && WheelPicker_styles_default.disabledIcon], children: "\u{1F5D3}\uFE0F" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx2(Modal, { visible: showModal, transparent: true, animationType: "fade", onRequestClose: onHandleCloseModal, children: /* @__PURE__ */ jsxs(View, { style: WheelPicker_styles_default.modalOverlay, children: [
      /* @__PURE__ */ jsx2(Pressable, { style: StyleSheet3.absoluteFill, onPress: onHandleCloseModal }),
      /* @__PURE__ */ jsxs(View, { style: WheelPicker_styles_default.modalContent, children: [
        actionButtonsPosition === "top" && /* @__PURE__ */ jsxs(View, { style: dualWheel ? WheelPicker_styles_default.dualActionButtons : WheelPicker_styles_default.actionButtons, children: [
          /* @__PURE__ */ jsx2(TouchableOpacity, { onPress: onHandleCloseModal, children: /* @__PURE__ */ jsx2(Text, { style: WheelPicker_styles_default.actionText, children: leftActionButtonText }) }),
          /* @__PURE__ */ jsx2(TouchableOpacity, { onPress: onHandleSelect, children: /* @__PURE__ */ jsx2(Text, { style: WheelPicker_styles_default.actionText, children: rightActionButtonText }) })
        ] }),
        /* @__PURE__ */ jsxs(View, { style: WheelPicker_styles_default.wheelContainer, children: [
          resolvedMode === "month-year" && /* @__PURE__ */ jsxs(View, { style: [WheelPicker_styles_default.wheelRowLeft, WheelPicker_styles_default.wheelColumn], children: [
            /* @__PURE__ */ jsx2(View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
            renderWheel(filteredMonthsList, setTempSelectedMonth, scrollYMonth, setMonthRef)
          ] }),
          resolvedMode === "year" && /* @__PURE__ */ jsxs(View, { style: [WheelPicker_styles_default.wheelRow, WheelPicker_styles_default.wheelColumn], children: [
            /* @__PURE__ */ jsx2(View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
            renderWheel(yearsList, (val) => setTempSelectedYear(val), scrollYYear, setYearRef)
          ] }),
          resolvedMode === "month-year" && /* @__PURE__ */ jsxs(View, { style: [WheelPicker_styles_default.wheelRowRight, WheelPicker_styles_default.wheelColumn], children: [
            /* @__PURE__ */ jsx2(View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
            renderWheel(yearsList, (val) => setTempSelectedYear(val), scrollYYear, setYearRef)
          ] }),
          resolvedMode === "single" && /* @__PURE__ */ jsxs(View, { style: [WheelPicker_styles_default.wheelRow, WheelPicker_styles_default.wheelColumn], children: [
            /* @__PURE__ */ jsx2(View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
            renderWheel(genericPrimaryList, (val) => setGPrimary(val), scrollYYear, setYearRef)
          ] }),
          resolvedMode === "dual" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(View, { style: [WheelPicker_styles_default.wheelRowLeft, WheelPicker_styles_default.wheelColumn], children: [
              /* @__PURE__ */ jsx2(View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
              renderWheel(genericPrimaryList, (val) => setGPrimary(val), scrollYMonth, setMonthRef)
            ] }),
            /* @__PURE__ */ jsxs(View, { style: [WheelPicker_styles_default.wheelRowRight, WheelPicker_styles_default.wheelColumn], children: [
              /* @__PURE__ */ jsx2(View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
              renderWheel(genericSecondaryList, (val) => setGSecondary(val), scrollYYear, setYearRef)
            ] })
          ] }),
          resolvedMode === "triple" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(View, { style: [WheelPicker_styles_default.wheelRowLeft, WheelPicker_styles_default.wheelColumn], children: [
              /* @__PURE__ */ jsx2(View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
              renderWheel(genericPrimaryList, (val) => setGPrimary(val), scrollYLeft, setLeftRef)
            ] }),
            /* @__PURE__ */ jsxs(View, { style: [WheelPicker_styles_default.wheelRow, WheelPicker_styles_default.wheelColumn], children: [
              /* @__PURE__ */ jsx2(View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
              renderWheel(genericCenterList, (val) => setGSecondary(val), scrollYCenter, setCenterRef)
            ] }),
            /* @__PURE__ */ jsxs(View, { style: [WheelPicker_styles_default.wheelRowRight, WheelPicker_styles_default.wheelColumn], children: [
              /* @__PURE__ */ jsx2(View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
              renderWheel(genericSecondaryList, (val) => setTempSelectedMonth(val), scrollYRight, setRightRef)
            ] })
          ] })
        ] }),
        renderFooterActions ? renderFooterActions({ onCancel: onHandleCloseModal, onConfirm: onHandleSelect }) : actionButtonsPosition === "bottom" && /* @__PURE__ */ jsxs(View, { style: WheelPicker_styles_default.actionButtons, children: [
          /* @__PURE__ */ jsx2(TouchableOpacity, { onPress: onHandleCloseModal, children: /* @__PURE__ */ jsx2(Text, { style: WheelPicker_styles_default.actionText, children: leftActionButtonText }) }),
          /* @__PURE__ */ jsx2(TouchableOpacity, { onPress: onHandleSelect, children: /* @__PURE__ */ jsx2(Text, { style: WheelPicker_styles_default.actionText, children: rightActionButtonText }) })
        ] })
      ] })
    ] }) })
  ] });
};
var WheelPicker_default = WheelPicker;

// src/pickers/YearPicker.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var YearPicker = ({ selectedYear, onSelect, minimum, maximum, renderTrigger, ...rest }) => {
  return /* @__PURE__ */ jsx3(
    WheelPicker_default,
    {
      mode: "year",
      minimum,
      maximum,
      chosenYear: selectedYear != null ? selectedYear : void 0,
      renderTrigger,
      onSelect: (v) => {
        var _a;
        if (typeof v === "object" && v !== null && "selectedYear" in v) {
          onSelect({ selectedYear: (_a = v.selectedYear) != null ? _a : null });
        }
      },
      ...rest
    }
  );
};
var YearPicker_default = YearPicker;

// src/pickers/MonthYearPicker.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var MonthYearPicker = ({ selectedDate, onSelect, minimum, maximum, renderTrigger, ...rest }) => {
  return /* @__PURE__ */ jsx4(
    WheelPicker_default,
    {
      mode: "month-year",
      minimum,
      maximum,
      selectedDate,
      renderTrigger,
      onSelect: (v) => {
        if (v instanceof Date) onSelect(v);
      },
      ...rest
    }
  );
};
var MonthYearPicker_default = MonthYearPicker;

// src/pickers/ListPicker.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var ListPicker = ({ items, selected, onSelect, renderTrigger, ...rest }) => {
  return /* @__PURE__ */ jsx5(
    WheelPicker_default,
    {
      mode: "single",
      items,
      selectedItem: selected != null ? selected : null,
      renderTrigger,
      onSelect: (v) => {
        if (typeof v === "string") onSelect(v);
      },
      ...rest
    }
  );
};
var ListPicker_default = ListPicker;

// src/pickers/DualPicker.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var DualPicker = ({ onSelect, renderTrigger, ...rest }) => {
  return /* @__PURE__ */ jsx6(
    WheelPicker_default,
    {
      mode: "dual",
      renderTrigger,
      onSelect: (v) => {
        if (typeof v === "object" && v !== null && "left" in v) {
          const { left, right } = v;
          onSelect({ left: left != null ? left : null, right: right != null ? right : null });
        }
      },
      ...rest
    }
  );
};
var DualPicker_default = DualPicker;

// src/pickers/TriplePicker.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
var TriplePicker = ({ onSelect, ...rest }) => {
  return /* @__PURE__ */ jsx7(
    WheelPicker_default,
    {
      mode: "triple",
      onSelect: (v) => {
        if (typeof v === "object" && v !== null && "left" in v) {
          const { left, right } = v;
          onSelect({ left: left != null ? left : null, center: null, right: right != null ? right : null });
        }
      },
      ...rest
    }
  );
};
var TriplePicker_default = TriplePicker;

// src/pickers/DatePicker.tsx
import { useMemo as useMemo2 } from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
var DatePicker = ({
  minimumYear,
  maximumYear,
  initialDate,
  locale = "default",
  onSelect,
  renderTrigger,
  ...rest
}) => {
  const months = useMemo2(() => {
    const formatter = new Intl.DateTimeFormat(locale, { month: "long" });
    return Array.from({ length: 12 }, (_, i) => formatter.format(new Date(2e3, i, 1)));
  }, [locale]);
  const daysFor = (year, monthIndex) => {
    const key = `${year}-${monthIndex}`;
    daysFor._cache = daysFor._cache || /* @__PURE__ */ new Map();
    const cache = daysFor._cache;
    if (cache.has(key)) return cache.get(key);
    const numDays = new Date(year, monthIndex + 1, 0).getDate();
    const arr = Array.from({ length: numDays }, (_, i) => String(i + 1));
    cache.set(key, arr);
    return arr;
  };
  const initial = useMemo2(() => {
    const d = initialDate ? new Date(initialDate) : /* @__PURE__ */ new Date();
    const year = Math.min(Math.max(d.getFullYear(), minimumYear), maximumYear);
    const monthIdx = d.getMonth();
    const day = d.getDate();
    return { year, monthIdx, day };
  }, [initialDate, minimumYear, maximumYear]);
  return /* @__PURE__ */ jsx8(
    WheelPicker_default,
    {
      mode: "triple",
      renderTrigger,
      leftItems: Array.from({ length: maximumYear - minimumYear + 1 }, (_, i) => String(minimumYear + i)),
      getCenterItems: (left) => {
        return months.map(
          (m) => m.length > 3 ? `${m.slice(0, 3)}.` : m
        );
      },
      getRightItemsFromCenter: (center, left) => {
        const monthIndex = center ? months.findIndex((m) => m.startsWith(center.replace(".", ""))) : initial.monthIdx;
        const year = left ? parseInt(left, 10) : initial.year;
        return daysFor(year, monthIndex);
      },
      renderFooterActions: () => null,
      onSelect: (v) => {
        if (typeof v === "object" && v !== null && "left" in v) {
          const left = v.left;
          const center = v.center;
          const right = v.right;
          const year = left ? parseInt(left, 10) : initial.year;
          const monthIdx = center ? months.findIndex((m) => m.toLowerCase().startsWith(center.replace(".", "").toLowerCase())) : initial.monthIdx;
          const day = right ? parseInt(right, 10) : initial.day;
          onSelect(new Date(year, monthIdx, day, 0, 0, 0));
        }
      },
      ...rest
    }
  );
};
var DatePicker_default = DatePicker;
export {
  DatePicker_default as DatePicker,
  DualPicker_default as DualPicker,
  ListPicker_default as ListPicker,
  MonthYearPicker_default as MonthYearPicker,
  TriplePicker_default as TriplePicker,
  WheelPicker_default as WheelPicker,
  YearPicker_default as YearPicker
};
//# sourceMappingURL=index.esm.js.map