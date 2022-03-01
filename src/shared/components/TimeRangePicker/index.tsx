import { InlineError } from '@shopify/polaris';
import moment from 'moment';
import React, { useState } from 'react';
import { TimePicker } from './components/TimePicker';

import styles from './styles.module.scss';

type DateValues = { start: Date; end: Date };

type Props = {
  values: DateValues;
  onChange: (arg: DateValues) => void;
  disabled?: boolean;
};

export const TimeRangePicker = ({ values, onChange, disabled }: Props): JSX.Element => {
  const [startPopoverOpen, setStartPopoverOpen] = useState(false);
  const [endPopoverOpen, setEndPopoverOpen] = useState(false);

  const toggleStartPopover = () => setStartPopoverOpen((prev) => !prev);
  const toggleEndPopover = () => setEndPopoverOpen((prev) => !prev);

  const handleDateChange = (type: 'start' | 'end') => (date: Date) => {
    onChange({
      ...values,
      [type]: date,
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.picker}>
        <TimePicker
          active={startPopoverOpen}
          togglePopoverActive={toggleStartPopover}
          onChange={handleDateChange('start')}
          disabled={disabled}
          value={values.start}
        />
        <span className={styles.divider}>-</span>
        <TimePicker
          active={endPopoverOpen}
          togglePopoverActive={toggleEndPopover}
          onChange={handleDateChange('end')}
          disabled={disabled}
          value={values.end}
          error={moment(values.start).isSameOrAfter(moment(values.end))}
        />
      </div>
      {moment(values.start).isSameOrAfter(moment(values.end)) && (
        <div className={styles.error}>
          <InlineError message="The end time must be later than the start time" fieldID="" />
        </div>
      )}
    </div>
  );
};
