import React from 'react';
import WheelPicker, { WheelPickerValue } from '../WheelPicker';
import { CommonPickerProps } from './types';

export type TriplePickerProps = CommonPickerProps & {
  leftItems: string[];
  centerItems?: string[];
  rightItems?: string[];
  getCenterItems?: (left: string | null) => string[];
  getRightItemsFromCenter?: (center: string | null) => string[];
  selectedLeft?: string | null;
  selectedCenter?: string | null;
  selectedRight?: string | null;
  onSelect: (value: { left: string | null; center: string | null; right: string | null }) => void;
};

const TriplePicker: React.FC<TriplePickerProps> = ({ onSelect, ...rest }) => {
  return (
    <WheelPicker
      mode="triple"
      onSelect={(v: WheelPickerValue) => {
        if (typeof v === 'object' && v !== null && 'left' in v) {
          const { left, right } = v as any;
          // In triple mode, WheelPicker returns { left, right } where right is the last column value.
          // We do not receive center explicitly; consumers can capture from props/state if needed.
          onSelect({ left: left ?? null, center: null, right: right ?? null });
        }
      }}
      {...rest}
    />
  );
};

export default TriplePicker;


