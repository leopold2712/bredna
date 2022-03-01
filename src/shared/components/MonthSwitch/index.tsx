import React, { FC, useCallback, useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import { Button } from '@shopify/polaris';
import { ChevronLeftMinor, ChevronRightMinor } from '@shopify/polaris-icons';

import styles from './monthSwitch.module.scss';

type TProps = {
  setNewDates: ({ start, end }: { start: Date; end: Date }) => void;
  currentDate: Moment;
  setCurrentDate: (date: Moment) => void;
};

export const MonthSwitch: FC<TProps> = ({
  setNewDates,
  currentDate,
  setCurrentDate,
}: TProps): JSX.Element => {
  const [isNext, setIsNext] = useState(false);
  const [isNextCurrentMonth, setIsNextCurrentMonth] = useState(false);

  useEffect(() => {
    setIsNext(currentDate.month() !== moment().month());
    setIsNextCurrentMonth(currentDate.month() + 1 === moment().month());
  }, [currentDate]);

  const handleNextMonth = useCallback(() => {
    const newDate = moment(currentDate).add(1, 'M');
    setCurrentDate(newDate);

    setNewDates({
      start: newDate.startOf('M').toDate(),
      end: isNextCurrentMonth ? moment().toDate() : newDate.endOf('M').endOf('day').toDate(),
    });
  }, [currentDate, isNextCurrentMonth]);

  const handlePrevMonth = useCallback(() => {
    const newDate = moment(currentDate).subtract(1, 'M');
    setCurrentDate(moment(currentDate).subtract(1, 'M'));
    setNewDates({
      start: newDate.startOf('M').toDate(),
      end: newDate.endOf('M').endOf('day').toDate(),
    });
  }, [currentDate]);

  return (
    <div className={styles.wrapper}>
      <Button icon={ChevronLeftMinor} onClick={handlePrevMonth} />
      <p className={styles.month}>{currentDate.format('MMMM YYYY')}</p>
      {isNext && <Button icon={ChevronRightMinor} onClick={handleNextMonth} />}
    </div>
  );
};
