import React from 'react';
import WheelPicker, { WheelPickerValue } from '../WheelPicker';
import { CommonPickerProps } from './types';

export type YearPickerProps = CommonPickerProps & {
  minimum: number;
  maximum: number;
  selectedYear?: string | null;
  onSelect: (value: { selectedYear: string | null }) => void;
};

const YearPicker: React.FC<YearPickerProps> = ({ selectedYear, onSelect, minimum, maximum, ...rest }) => {
  return (
    <WheelPicker
      mode="year"
      minimum={minimum}
      maximum={maximum}
      chosenYear={selectedYear ?? undefined}
      onSelect={(v: WheelPickerValue) => {
        if (typeof v === 'object' && v !== null && 'selectedYear' in v) {
          onSelect({ selectedYear: (v as any).selectedYear ?? null });
        }
      }}
      {...rest}
    />
  );
};

export default YearPicker;


