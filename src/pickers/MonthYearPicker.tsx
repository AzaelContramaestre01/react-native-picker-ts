import React from 'react';
import WheelPicker, { WheelPickerValue } from '../WheelPicker';
import { CommonPickerProps } from './types';

export type MonthYearPickerProps = CommonPickerProps & {
  minimum: number;
  maximum: number;
  selectedDate?: Date | string;
  onSelect: (value: Date) => void;
};

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ selectedDate, onSelect, minimum, maximum, ...rest }) => {
  return (
    <WheelPicker
      mode="month-year"
      minimum={minimum}
      maximum={maximum}
      selectedDate={selectedDate as any}
      onSelect={(v: WheelPickerValue) => {
        if (v instanceof Date) onSelect(v);
      }}
      {...rest}
    />
  );
};

export default MonthYearPicker;


