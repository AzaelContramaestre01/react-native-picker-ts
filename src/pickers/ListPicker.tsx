import React from 'react';
import WheelPicker, { WheelPickerValue } from '../WheelPicker';
import { CommonPickerProps } from './types';

export type ListPickerProps = CommonPickerProps & {
  items: string[];
  selected?: string | null;
  onSelect: (value: string) => void;
};

const ListPicker: React.FC<ListPickerProps> = ({ items, selected, onSelect, renderTrigger, ...rest }) => {
  return (
    <WheelPicker
      mode="single"
      items={items}
      selectedItem={selected ?? null}
      renderTrigger={renderTrigger}
      onSelect={(v: WheelPickerValue) => {
        if (typeof v === 'string') onSelect(v);
      }}
      {...rest}
    />
  );
};

export default ListPicker;


