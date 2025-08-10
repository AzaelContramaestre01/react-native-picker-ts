import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ActionButtonsPosition } from '../WheelPicker';

export type CommonPickerProps = {
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
  renderFooterActions?: (ctx: { onCancel: () => void; onConfirm: () => void }) => React.ReactNode;
  renderTrigger?: (ctx: { open: () => void; displayText: string; disabled: boolean }) => React.ReactNode;
};


