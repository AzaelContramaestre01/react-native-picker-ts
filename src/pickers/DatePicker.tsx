import React, { useMemo } from 'react';
import WheelPicker, { WheelPickerValue } from '../WheelPicker';
import { CommonPickerProps } from './types';

export type DatePickerProps = CommonPickerProps & {
  minimumYear: number;
  maximumYear: number;
  initialDate?: Date | string;
  locale?: string; // for month labels
  onSelect: (value: Date) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({
  minimumYear,
  maximumYear,
  initialDate,
  locale = 'default',
  onSelect,
  renderTrigger,
  ...rest
}) => {
  const months = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, { month: 'long' });
    return Array.from({ length: 12 }, (_, i) => formatter.format(new Date(2000, i, 1)));
  }, [locale]);

  const daysFor = (year: number, monthIndex: number) => {
    const key = `${year}-${monthIndex}`;
    (daysFor as any)._cache = (daysFor as any)._cache || new Map<string, string[]>();
    const cache: Map<string, string[]> = (daysFor as any)._cache;
    if (cache.has(key)) return cache.get(key)!;
    const numDays = new Date(year, monthIndex + 1, 0).getDate();
    const arr = Array.from({ length: numDays }, (_, i) => String(i + 1));
    cache.set(key, arr);
    return arr;
  };

  const initial = useMemo(() => {
    const d = initialDate ? new Date(initialDate) : new Date();
    const year = Math.min(Math.max(d.getFullYear(), minimumYear), maximumYear);
    const monthIdx = d.getMonth();
    const day = d.getDate();
    return { year, monthIdx, day };
  }, [initialDate, minimumYear, maximumYear]);

  return (
    <WheelPicker
      mode="triple"
      renderTrigger={renderTrigger}
      leftItems={Array.from({ length: maximumYear - minimumYear + 1 }, (_, i) => String(minimumYear + i))}
      getCenterItems={(left) => {
        return months.map((m) =>
          m.length > 3 ? `${m.slice(0, 3)}.` : m
        );
      }}
      getRightItemsFromCenter={(center, left) => {
        const monthIndex = center ? months.findIndex((m) => m.startsWith(center.replace('.', ''))) : initial.monthIdx;
        const year = left ? parseInt(left, 10) : initial.year;
        return daysFor(year, monthIndex);
      }}
      renderFooterActions={() => null}
      onSelect={(v: WheelPickerValue) => {
        if (typeof v === 'object' && v !== null && 'left' in v) {
          const left = (v as any).left as string | null;
          const center = (v as any).center as string | null;
          const right = (v as any).right as string | null;
          const year = left ? parseInt(left, 10) : initial.year;
          const monthIdx = center
            ? months.findIndex((m) => m.toLowerCase().startsWith(center.replace('.', '').toLowerCase()))
            : initial.monthIdx;
          const day = right ? parseInt(right, 10) : initial.day;
          onSelect(new Date(year, monthIdx, day, 0, 0, 0));
        }
      }}
      {...rest}
    />
  );
};

export default DatePicker;


