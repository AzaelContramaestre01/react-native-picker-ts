"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DatePicker: () => DatePicker_default,
  DualPicker: () => DualPicker_default,
  ListPicker: () => ListPicker_default,
  MonthYearPicker: () => MonthYearPicker_default,
  TriplePicker: () => TriplePicker_default,
  WheelPicker: () => WheelPicker_default,
  YearPicker: () => YearPicker_default
});
module.exports = __toCommonJS(index_exports);

// src/WheelPicker.tsx
var import_react3 = __toESM(require("react"));
var import_react_native3 = require("react-native");
var import_react_native_reanimated2 = __toESM(require("react-native-reanimated"));
var import_react_native_gesture_handler = require("react-native-gesture-handler");

// src/components/AnimatedItem.tsx
var import_react = __toESM(require("react"));
var import_react_native_reanimated = __toESM(require("react-native-reanimated"));

// src/components/AnimatedItem.styles.ts
var import_react_native = require("react-native");
var ITEM_HEIGHT = 50;
var styles = import_react_native.StyleSheet.create({
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
var import_react2 = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var ITEM_HEIGHT2 = 50;
var AnimatedItem = ({ index, scrollY, item }) => {
  const fontSizeStyle = (0, import_react2.useMemo)(() => {
    var _a;
    const length = (_a = item == null ? void 0 : item.length) != null ? _a : 0;
    let fontSize = 22;
    if (length > 18) fontSize = 14;
    else if (length > 14) fontSize = 16;
    else if (length > 10) fontSize = 18;
    return { fontSize };
  }, [item]);
  const animatedStyle = (0, import_react_native_reanimated.useAnimatedStyle)(() => {
    const position = index * ITEM_HEIGHT2;
    const scale = (0, import_react_native_reanimated.interpolate)(
      scrollY.value,
      [
        position - ITEM_HEIGHT2 * 2,
        position - ITEM_HEIGHT2,
        position,
        position + ITEM_HEIGHT2,
        position + ITEM_HEIGHT2 * 2
      ],
      [0.8, 0.98, 1.2, 0.98, 0.8],
      import_react_native_reanimated.Extrapolation.CLAMP
    );
    const opacity = (0, import_react_native_reanimated.interpolate)(
      scrollY.value,
      [position - ITEM_HEIGHT2, position, position + ITEM_HEIGHT2],
      [0.4, 1, 0.4],
      import_react_native_reanimated.Extrapolation.CLAMP
    );
    return { transform: [{ scale }], opacity };
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native_reanimated.default.View, { style: [AnimatedItem_styles_default.itemContainer, animatedStyle], children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native_reanimated.default.Text, { style: [AnimatedItem_styles_default.itemText, fontSizeStyle, animatedStyle], numberOfLines: 1, children: item }) });
};
var AnimatedItem_default = import_react.default.memo(AnimatedItem);

// src/styles/WheelPicker.styles.ts
var import_react_native2 = require("react-native");
var ITEM_HEIGHT3 = 50;
var wheelPickerStyles = import_react_native2.StyleSheet.create({
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
var import_jsx_runtime2 = require("react/jsx-runtime");
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
  renderFooterActions
}) => {
  const resolvedMode = mode != null ? mode : dualWheel ? "month-year" : "year";
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const effectiveStartYear = minimum != null ? minimum : currentYear - 10;
  const effectiveFinishYear = maximum != null ? maximum : currentYear;
  const monthsList = months;
  const [yearsList, setYearsList] = (0, import_react3.useState)(
    Array.from({ length: effectiveFinishYear - effectiveStartYear + 1 }, (_, i) => (effectiveStartYear + i).toString())
  );
  const [selectedYear, setSelectedYear] = (0, import_react3.useState)(null);
  const [selectedMonth, setSelectedMonth] = (0, import_react3.useState)(null);
  const [tempSelectedYear, setTempSelectedYear] = (0, import_react3.useState)(selectedYear);
  const [tempSelectedMonth, setTempSelectedMonth] = (0, import_react3.useState)(selectedMonth);
  const [showModal, setShowModal] = (0, import_react3.useState)(false);
  const chosenYearRef = (0, import_react3.useRef)(chosenYear);
  (0, import_react3.useEffect)(() => {
    chosenYearRef.current = chosenYear != null ? chosenYear : null;
  }, [chosenYear]);
  const scrollYYear = (0, import_react_native_reanimated2.useSharedValue)(0);
  const scrollYMonth = (0, import_react_native_reanimated2.useSharedValue)(0);
  const scrollYLeft = (0, import_react_native_reanimated2.useSharedValue)(0);
  const scrollYCenter = (0, import_react_native_reanimated2.useSharedValue)(0);
  const scrollYRight = (0, import_react_native_reanimated2.useSharedValue)(0);
  const scrollViewRefYear = (0, import_react3.useRef)(null);
  const scrollViewRefMonth = (0, import_react3.useRef)(null);
  const scrollViewRefLeft = (0, import_react3.useRef)(null);
  const scrollViewRefCenter = (0, import_react3.useRef)(null);
  const scrollViewRefRight = (0, import_react3.useRef)(null);
  const scrollHandlerYear = (0, import_react_native_reanimated2.useAnimatedScrollHandler)({
    onScroll: (event) => {
      scrollYYear.value = event.contentOffset.y;
    }
  });
  const scrollHandlerMonth = (0, import_react_native_reanimated2.useAnimatedScrollHandler)({
    onScroll: (event) => {
      scrollYMonth.value = event.contentOffset.y;
    }
  });
  const scrollHandlerLeft = (0, import_react_native_reanimated2.useAnimatedScrollHandler)({
    onScroll: (event) => {
      scrollYLeft.value = event.contentOffset.y;
    }
  });
  const scrollHandlerCenter = (0, import_react_native_reanimated2.useAnimatedScrollHandler)({
    onScroll: (event) => {
      scrollYCenter.value = event.contentOffset.y;
    }
  });
  const scrollHandlerRight = (0, import_react_native_reanimated2.useAnimatedScrollHandler)({
    onScroll: (event) => {
      scrollYRight.value = event.contentOffset.y;
    }
  });
  const filteredMonthsList = import_react3.default.useMemo(() => {
    if (tempSelectedYear && parseInt(tempSelectedYear, 10) === (/* @__PURE__ */ new Date()).getFullYear()) {
      return monthsList.slice(0, (/* @__PURE__ */ new Date()).getMonth() + 1);
    }
    return monthsList;
  }, [tempSelectedYear, monthsList]);
  const daysCacheRef = (0, import_react3.useRef)(/* @__PURE__ */ new Map());
  const [gPrimary, setGPrimary] = (0, import_react3.useState)(
    resolvedMode === "single" ? selectedItem != null ? selectedItem : null : resolvedMode === "dual" ? selectedLeft != null ? selectedLeft : null : null
  );
  const [gSecondary, setGSecondary] = (0, import_react3.useState)(
    resolvedMode === "dual" ? selectedRight != null ? selectedRight : null : null
  );
  const genericPrimaryList = import_react3.default.useMemo(() => {
    if (resolvedMode === "single") {
      return items != null ? items : [];
    }
    if (resolvedMode === "dual" || resolvedMode === "triple") {
      return leftItems != null ? leftItems : [];
    }
    return [];
  }, [items, leftItems, resolvedMode]);
  const genericCenterList = import_react3.default.useMemo(() => {
    if (resolvedMode !== "triple") return [];
    if (getCenterItems) return getCenterItems(gPrimary != null ? gPrimary : null);
    return centerItems != null ? centerItems : [];
  }, [resolvedMode, getCenterItems, gPrimary, centerItems]);
  const genericSecondaryList = import_react3.default.useMemo(() => {
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
  (0, import_react3.useEffect)(() => {
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
  (0, import_react3.useEffect)(() => {
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
  (0, import_react3.useEffect)(() => {
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
  (0, import_react3.useEffect)(() => {
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
  const onHandleCloseModal = (0, import_react3.useCallback)(() => {
    setTempSelectedYear(selectedYear);
    setTempSelectedMonth(selectedMonth);
    setShowModal(false);
  }, [selectedMonth, selectedYear]);
  const onHandleSelect = (0, import_react3.useCallback)(() => {
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
  const onHandleClearSelection = (0, import_react3.useCallback)(() => {
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
  const handleToggleShow = (0, import_react3.useCallback)(() => {
    if (!disabled) {
      setShowModal(!showModal);
    }
  }, [showModal, disabled]);
  const renderWheel = (0, import_react3.useCallback)((data, setSelectedValue, scrollY, ref) => {
    try {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native_gesture_handler.PanGestureHandler, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_react_native_reanimated2.default.ScrollView,
        {
          ref,
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
          children: data.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(AnimatedItem_default, { index, item, scrollY }, `${item}-${index}`))
        }
      ) });
    } catch (error) {
      console.error("Error in renderWheel:", error);
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, {});
    }
  }, [scrollHandlerMonth, scrollHandlerYear, scrollYYear]);
  const displayText = import_react3.default.useMemo(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native3.View, { style: WheelPicker_styles_default.root, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      import_react_native3.Pressable,
      {
        onPress: handleToggleShow,
        style: [WheelPicker_styles_default.infoDate, disabled && WheelPicker_styles_default.disabledContainer, containerStyle],
        pointerEvents: disabled ? "none" : "auto",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.Text, { style: [WheelPicker_styles_default.date, disabled && WheelPicker_styles_default.disabledText, textStyle], children: displayText }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.View, { style: [WheelPicker_styles_default.iconContainer, iconContainerStyle], children: showCleaner && chosenYearRef.current && !disabled ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.TouchableOpacity, { onPress: onHandleClearSelection, children: renderClearIcon != null ? renderClearIcon : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.Text, { style: WheelPicker_styles_default.iconText, children: "\u2715" }) }) : renderCalendarIcon != null ? renderCalendarIcon : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.Text, { style: [WheelPicker_styles_default.iconText, disabled && WheelPicker_styles_default.disabledIcon], children: "\u{1F5D3}\uFE0F" }) })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.Modal, { visible: showModal, transparent: true, animationType: "fade", onRequestClose: onHandleCloseModal, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native3.View, { style: WheelPicker_styles_default.modalOverlay, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.Pressable, { style: import_react_native3.StyleSheet.absoluteFill, onPress: onHandleCloseModal }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native3.View, { style: WheelPicker_styles_default.modalContent, children: [
        actionButtonsPosition === "top" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native3.View, { style: dualWheel ? WheelPicker_styles_default.dualActionButtons : WheelPicker_styles_default.actionButtons, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.TouchableOpacity, { onPress: onHandleCloseModal, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.Text, { style: WheelPicker_styles_default.actionText, children: leftActionButtonText }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.TouchableOpacity, { onPress: onHandleSelect, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.Text, { style: WheelPicker_styles_default.actionText, children: rightActionButtonText }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native3.View, { style: WheelPicker_styles_default.wheelContainer, children: [
          resolvedMode === "month-year" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native3.View, { style: [WheelPicker_styles_default.wheelRowLeft, WheelPicker_styles_default.wheelColumn], children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
            renderWheel(filteredMonthsList, setTempSelectedMonth, scrollYMonth, scrollViewRefMonth)
          ] }),
          resolvedMode === "year" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native3.View, { style: [WheelPicker_styles_default.wheelRow, WheelPicker_styles_default.wheelColumn], children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
            renderWheel(yearsList, (val) => setTempSelectedYear(val), scrollYYear, scrollViewRefYear)
          ] }),
          resolvedMode === "month-year" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native3.View, { style: [WheelPicker_styles_default.wheelRowRight, WheelPicker_styles_default.wheelColumn], children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
            renderWheel(yearsList, (val) => setTempSelectedYear(val), scrollYYear, scrollViewRefYear)
          ] }),
          resolvedMode === "single" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native3.View, { style: [WheelPicker_styles_default.wheelRow, WheelPicker_styles_default.wheelColumn], children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
            renderWheel(genericPrimaryList, (val) => setGPrimary(val), scrollYYear, scrollViewRefYear)
          ] }),
          resolvedMode === "dual" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native3.View, { style: [WheelPicker_styles_default.wheelRowLeft, WheelPicker_styles_default.wheelColumn], children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
              renderWheel(genericPrimaryList, (val) => setGPrimary(val), scrollYMonth, scrollViewRefMonth)
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native3.View, { style: [WheelPicker_styles_default.wheelRowRight, WheelPicker_styles_default.wheelColumn], children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
              renderWheel(genericSecondaryList, (val) => setGSecondary(val), scrollYYear, scrollViewRefYear)
            ] })
          ] }),
          resolvedMode === "triple" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native3.View, { style: [WheelPicker_styles_default.wheelRowLeft, WheelPicker_styles_default.wheelColumn], children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
              renderWheel(genericPrimaryList, (val) => setGPrimary(val), scrollYLeft, scrollViewRefLeft)
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native3.View, { style: [WheelPicker_styles_default.wheelRow, WheelPicker_styles_default.wheelColumn], children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
              renderWheel(genericCenterList, (val) => setGSecondary(val), scrollYCenter, scrollViewRefCenter)
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native3.View, { style: [WheelPicker_styles_default.wheelRowRight, WheelPicker_styles_default.wheelColumn], children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.View, { style: WheelPicker_styles_default.selectionOverlay, pointerEvents: "none" }),
              renderWheel(genericSecondaryList, (val) => setTempSelectedMonth(val), scrollYRight, scrollViewRefRight)
            ] })
          ] })
        ] }),
        renderFooterActions ? renderFooterActions({ onCancel: onHandleCloseModal, onConfirm: onHandleSelect }) : actionButtonsPosition === "bottom" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native3.View, { style: WheelPicker_styles_default.actionButtons, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.TouchableOpacity, { onPress: onHandleCloseModal, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.Text, { style: WheelPicker_styles_default.actionText, children: leftActionButtonText }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.TouchableOpacity, { onPress: onHandleSelect, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native3.Text, { style: WheelPicker_styles_default.actionText, children: rightActionButtonText }) })
        ] })
      ] })
    ] }) })
  ] });
};
var WheelPicker_default = WheelPicker;

// src/pickers/YearPicker.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var YearPicker = ({ selectedYear, onSelect, minimum, maximum, ...rest }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    WheelPicker_default,
    {
      mode: "year",
      minimum,
      maximum,
      chosenYear: selectedYear != null ? selectedYear : void 0,
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
var import_jsx_runtime4 = require("react/jsx-runtime");
var MonthYearPicker = ({ selectedDate, onSelect, minimum, maximum, ...rest }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    WheelPicker_default,
    {
      mode: "month-year",
      minimum,
      maximum,
      selectedDate,
      onSelect: (v) => {
        if (v instanceof Date) onSelect(v);
      },
      ...rest
    }
  );
};
var MonthYearPicker_default = MonthYearPicker;

// src/pickers/ListPicker.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var ListPicker = ({ items, selected, onSelect, ...rest }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    WheelPicker_default,
    {
      mode: "single",
      items,
      selectedItem: selected != null ? selected : null,
      onSelect: (v) => {
        if (typeof v === "string") onSelect(v);
      },
      ...rest
    }
  );
};
var ListPicker_default = ListPicker;

// src/pickers/DualPicker.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var DualPicker = ({ onSelect, ...rest }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    WheelPicker_default,
    {
      mode: "dual",
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
var import_jsx_runtime7 = require("react/jsx-runtime");
var TriplePicker = ({ onSelect, ...rest }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
var import_react4 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
var DatePicker = ({
  minimumYear,
  maximumYear,
  initialDate,
  locale = "default",
  onSelect,
  ...rest
}) => {
  const months = (0, import_react4.useMemo)(() => {
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
  const initial = (0, import_react4.useMemo)(() => {
    const d = initialDate ? new Date(initialDate) : /* @__PURE__ */ new Date();
    const year = Math.min(Math.max(d.getFullYear(), minimumYear), maximumYear);
    const monthIdx = d.getMonth();
    const day = d.getDate();
    return { year, monthIdx, day };
  }, [initialDate, minimumYear, maximumYear]);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    WheelPicker_default,
    {
      mode: "triple",
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
      renderFooterActions: ({ onCancel, onConfirm }) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_jsx_runtime8.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { style: { height: 12 } }) }),
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DatePicker,
  DualPicker,
  ListPicker,
  MonthYearPicker,
  TriplePicker,
  WheelPicker,
  YearPicker
});
//# sourceMappingURL=index.cjs.js.map