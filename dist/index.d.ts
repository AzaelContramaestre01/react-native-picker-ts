import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

type ActionButtonsPosition = 'top' | 'bottom';
interface WheelPickerSelection {
    selectedYear: string | null;
    selectedMonth?: string | null;
    formattedDate?: string;
}
type PickerMode = 'year' | 'month-year' | 'single' | 'dual' | 'triple';
type WheelPickerValue = Date | string | {
    selectedYear: string | null;
} | {
    left: string | null;
    center?: string | null;
    right?: string | null;
};
interface WheelPickerProps {
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
    months?: string[];
    onSelect: (selection: WheelPickerValue) => void;
    disabled?: boolean;
    renderCalendarIcon?: React.ReactNode;
    renderClearIcon?: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    iconContainerStyle?: StyleProp<ViewStyle>;
    mode?: PickerMode;
    items?: string[];
    selectedItem?: string | null;
    leftItems?: string[];
    rightItems?: string[];
    getRightItems?: (left: string | null) => string[];
    selectedLeft?: string | null;
    selectedRight?: string | null;
    centerItems?: string[];
    getCenterItems?: (left: string | null) => string[];
    getRightItemsFromCenter?: (center: string | null, left?: string | null) => string[];
    selectedCenter?: string | null;
    renderFooterActions?: (ctx: {
        onCancel: () => void;
        onConfirm: () => void;
    }) => React.ReactNode;
    renderTrigger?: (ctx: {
        open: () => void;
        displayText: string;
        disabled: boolean;
        onClear: () => void;
        showCleaner: boolean;
    }) => React.ReactNode;
}
declare const WheelPicker: React.FC<WheelPickerProps>;

type CommonPickerProps = {
    placeholder?: string;
    disabled?: boolean;
    renderCalendarIcon?: React.ReactNode;
    renderClearIcon?: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    iconContainerStyle?: StyleProp<ViewStyle>;
    actionButtonsPosition?: ActionButtonsPosition;
    leftActionButtonText?: string;
    rightActionButtonText?: string;
    showCleaner?: boolean;
    renderFooterActions?: (ctx: {
        onCancel: () => void;
        onConfirm: () => void;
    }) => React.ReactNode;
    renderTrigger?: (ctx: {
        open: () => void;
        displayText: string;
        disabled: boolean;
    }) => React.ReactNode;
};

type YearPickerProps = CommonPickerProps & {
    minimum: number;
    maximum: number;
    selectedYear?: string | null;
    onSelect: (value: {
        selectedYear: string | null;
    }) => void;
};
declare const YearPicker: React.FC<YearPickerProps>;

type MonthYearPickerProps = CommonPickerProps & {
    minimum: number;
    maximum: number;
    selectedDate?: Date | string;
    onSelect: (value: Date) => void;
};
declare const MonthYearPicker: React.FC<MonthYearPickerProps>;

type ListPickerProps = CommonPickerProps & {
    items: string[];
    selected?: string | null;
    onSelect: (value: string) => void;
};
declare const ListPicker: React.FC<ListPickerProps>;

type DualPickerProps = CommonPickerProps & {
    leftItems: string[];
    rightItems?: string[];
    getRightItems?: (left: string | null) => string[];
    selectedLeft?: string | null;
    selectedRight?: string | null;
    onSelect: (value: {
        left: string | null;
        right: string | null;
    }) => void;
};
declare const DualPicker: React.FC<DualPickerProps>;

type TriplePickerProps = CommonPickerProps & {
    leftItems: string[];
    centerItems?: string[];
    rightItems?: string[];
    getCenterItems?: (left: string | null) => string[];
    getRightItemsFromCenter?: (center: string | null) => string[];
    selectedLeft?: string | null;
    selectedCenter?: string | null;
    selectedRight?: string | null;
    onSelect: (value: {
        left: string | null;
        center: string | null;
        right: string | null;
    }) => void;
};
declare const TriplePicker: React.FC<TriplePickerProps>;

type DatePickerProps = CommonPickerProps & {
    minimumYear: number;
    maximumYear: number;
    initialDate?: Date | string;
    locale?: string;
    onSelect: (value: Date) => void;
};
declare const DatePicker: React.FC<DatePickerProps>;

export { type ActionButtonsPosition, DatePicker, DualPicker, ListPicker, MonthYearPicker, TriplePicker, WheelPicker, type WheelPickerProps, type WheelPickerSelection, YearPicker };
