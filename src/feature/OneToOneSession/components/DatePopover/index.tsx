import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import { Popover, Icon, DatePicker, Button } from '@shopify/polaris';
import { CalendarMinor } from '@shopify/polaris-icons';

import styles from './styles.module.scss';

type Props = {
  month: number;
  year: number;
  availabilityDate: Moment;
  disabled?: boolean;
  handleDateInput: (data: { [key: string]: string }) => void;
  handleMonthChange: (month: number, year: number) => void;
};

export const DatePopover = ({
  month,
  year,
  availabilityDate,
  disabled = false,
  handleDateInput,
  handleMonthChange,
}: Props): JSX.Element => {
  const [popoverActive, setPopoverActive] = useState(false);
  const togglePopover = () => setPopoverActive((prev) => !prev);

  const activator = (
    <Button
      disclosure="select"
      icon={<Icon source={CalendarMinor} />}
      onClick={togglePopover}
      fullWidth
      textAlign="left"
      disabled={disabled}
    >
      {moment(availabilityDate).format('MMM D, YYYY')}
    </Button>
  );
  return (
    <Popover active={popoverActive} activator={activator} onClose={togglePopover} sectioned>
      <div className={styles.datePickerWrapper}>
        <DatePicker
          month={month}
          year={year}
          onChange={(date) => {
            togglePopover();
            handleDateInput({
              year: moment(date.start.toString()).format('YYYY'),
              month: moment(date.start.toString()).format('MMMM'),
              date: moment(date.start.toString()).format('D'),
            });
          }}
          onMonthChange={handleMonthChange}
          selected={moment(availabilityDate).toDate()}
          disableDatesBefore={moment().startOf('day').toDate()}
        />
      </div>
    </Popover>
  );
};
