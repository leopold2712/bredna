import { Button } from '@shopify/polaris';
import { ChevronLeftMinor, ChevronRightMinor } from '@shopify/polaris-icons';
import moment, { Moment } from 'moment';
import React, { useCallback } from 'react';
import { useAppDispatch } from '../../../../main/store/hooks';
import { setLoading } from '../../store';
import styles from './monthSwitch.module.scss';

type Props = {
  setNewDates: ({ start, end }: { start: Date; end: Date }) => void;
  currentDate: Moment;
  setCurrentDate: (date: Moment) => void;
};

const MonthSwitch: React.FC<Props> = ({
  setNewDates,
  currentDate,
  setCurrentDate,
}: Props): React.ReactElement => {
  const isNext = currentDate.month() !== moment().month();

  const dispatch = useAppDispatch();

  const handleNextMonth = useCallback(() => {
    const newDate = moment(currentDate).add(1, 'M');
    setCurrentDate(newDate);
    setNewDates({
      start: newDate.startOf('M').toDate(),
      end: newDate.endOf('M').endOf('day').toDate(),
    });
    dispatch(setLoading());
  }, [currentDate]);

  const handlePrevMonth = useCallback(() => {
    const newDate = moment(currentDate).subtract(1, 'M');
    setCurrentDate(moment(currentDate).subtract(1, 'M'));
    setNewDates({
      start: newDate.startOf('M').toDate(),
      end: newDate.endOf('M').endOf('day').toDate(),
    });
    dispatch(setLoading());
  }, [currentDate]);

  return (
    <div className={styles.wrapper}>
      <Button icon={ChevronLeftMinor} onClick={handlePrevMonth} />
      <p className={styles.month}>{currentDate.format('MMMM YYYY')}</p>
      {isNext && <Button icon={ChevronRightMinor} onClick={handleNextMonth} />}
      <p className={styles.monthsLabel}>
        {`compared from ${currentDate.startOf('M').format('MMM D, YYYY')} to ${currentDate
          .endOf('M')
          .format('MMM D, YYYY')}`}
      </p>
    </div>
  );
};

export default MonthSwitch;
