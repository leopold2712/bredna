import React, { FC, useCallback, useEffect, useState } from 'react';
import { Image, TextField, Popover, SkeletonBodyText, DatePicker } from '@shopify/polaris';
import classNames from 'classnames';

import type { datesType } from '../../Pages/Tabs/Messaging';

import sortImg from '../../../../assets/images/sort.svg';
import styles from './styles.module.scss';

const LoadingRow = () => (
  <div className={styles.loading_row}>
    <SkeletonBodyText lines={1} />
  </div>
);

type TProps = {
  isByDays: boolean;
  dates: datesType;
  setSelectedDates: ({ start, end }: datesType) => void;
  selectedDates: datesType;
  setDaySearch: (value: string) => void;
  setNameSearch: (value: string) => void;
};

export const MessagingTable: FC<TProps> = ({
  isByDays,
  dates,
  setSelectedDates,
  selectedDates,
  setDaySearch,
  setNameSearch,
}: TProps) => {
  const [isNamePopover, setIsNamePopover] = useState(false);
  const [isTotalPopover, setIsTotalPopover] = useState(false);
  const [dateFilterTouched, setDateFilterTouched] = useState(false);
  const [{ month, year }, setDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const handleDateFilter = (arg: datesType) => {
    setDateFilterTouched(true);
    setSelectedDates(arg);
  };

  const handleMonthChange = useCallback(
    (month: number, year: number) => setDate({ month, year }),
    [],
  );

  useEffect(() => {
    handleMonthChange(dates.start.getMonth(), dates.start.getFullYear());
  }, [dates]);

  const toggleNamePopover = () => setIsNamePopover((popoverActive) => !popoverActive);
  const toggleTotalDaysPopover = () => setIsTotalPopover((popoverActive) => !popoverActive);

  return (
    <div className={styles.table}>
      <div className={styles.table__header}>
        <div className={styles.table__header_item}>
          <p>Client name</p>
          <Popover
            active={isNamePopover}
            activator={
              <p className={classNames(styles.popover__btn, { [styles.active]: isNamePopover })}>
                <Image onClick={toggleNamePopover} source={sortImg} alt="sort image" />
              </p>
            }
            onClose={toggleNamePopover}
          >
            <div className={styles.popover__item}>
              <TextField label="Search by name" onChange={(value) => setNameSearch(value)} />
            </div>
          </Popover>
        </div>
        <div className={styles.table__header_item}>
          {isByDays ? (
            <>
              <p>Total days</p>
              <Popover
                active={isTotalPopover}
                activator={
                  <p
                    className={classNames(styles.popover__btn, { [styles.active]: isTotalPopover })}
                  >
                    <Image onClick={toggleTotalDaysPopover} source={sortImg} alt="sort image" />
                  </p>
                }
                onClose={toggleTotalDaysPopover}
              >
                <div className={styles.popover__item}>
                  <TextField
                    label="Search by number"
                    type="number"
                    onChange={(value) => setDaySearch(value)}
                  />
                </div>
              </Popover>
            </>
          ) : (
            <>
              <p>Dates</p>
              <Popover
                active={isTotalPopover}
                activator={
                  <p
                    className={classNames(styles.popover__btn, { [styles.active]: isTotalPopover })}
                  >
                    <Image onClick={toggleTotalDaysPopover} source={sortImg} alt="sort image" />
                  </p>
                }
                onClose={toggleTotalDaysPopover}
              >
                <div className={classNames(styles.popover__item, styles.datepicker)}>
                  <DatePicker
                    month={month}
                    year={year}
                    onChange={handleDateFilter}
                    onMonthChange={handleMonthChange}
                    selected={selectedDates}
                    allowRange
                  />
                </div>
              </Popover>
            </>
          )}
        </div>
        <div className={styles.table__header_item}>Earnings</div>
      </div>
      <div className={styles.table__body}>
        <div className={styles.table__row}>
          <p>Name</p>
          <p>Days</p>
          <p>Earnings</p>
        </div>
      </div>
    </div>
  );
};
