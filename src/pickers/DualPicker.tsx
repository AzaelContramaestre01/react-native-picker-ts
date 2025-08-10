import React from 'react';
import WheelPicker, { WheelPickerValue } from '../WheelPicker';
import { CommonPickerProps } from './types';

export type DualPickerProps = CommonPickerProps & {
  leftItems: string[];
  rightItems?: string[];
  getRightItems?: (left: string | null) => string[];
  selectedLeft?: string | null;
  selectedRight?: string | null;
  onSelect: (value: { left: string | null; right: string | null }) => void;
};

const DualPicker: React.FC<DualPickerProps> = ({ onSelect, ...rest }) => {
  return (
    <WheelPicker
      mode="dual"
      onSelect={(v: WheelPickerValue) => {
        if (typeof v === 'object' && v !== null && 'left' in v) {
          const { left, right } = v as any;
          onSelect({ left: left ?? null, right: right ?? null });
        }
      }}
      {...rest}
    />
  );
};

export default DualPicker;


