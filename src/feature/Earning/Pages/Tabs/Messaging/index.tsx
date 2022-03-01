import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { Button } from '@shopify/polaris';
import classNames from 'classnames';

import { MonthSwitch } from '../../../../../shared/components/MonthSwitch';
import { MessagingTable } from '../../../components/MessagingTable';
import { useCustomWindowWidth } from '../../../../../shared/hooks/useCustomWindowWidth';
import { useAppSelector } from '../../../../../main/store/hooks';
import { getRevShareMessagingAsync } from '../../../store/actions/getRevShareMessagingAsync';
import { useAppDispatch } from '../../../../../main/store';

import styles from './styles.module.scss';
import useDebounce from '../../../../../shared/hooks/useDebounce';
import { MessagingCard } from '../../../components/MessagingCard';

const initialDates = {
  start: new Date(),
  end: new Date(),
};

export type datesType = typeof initialDates;

const filters = {
  by_days: 'By days',
  by_dates: 'By dates',
};

export const Messaging: FC = () => {
  const dispatch = useAppDispatch();
  const { desktopView } = useCustomWindowWidth();

  const { messaging } = useAppSelector((state) => state.earning);

  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDates, setSelectedDates] = useState(initialDates);
  const [startTime, setStartTime] = useState(moment().startOf('M').toDate());
  const [endTime, setEndTime] = useState(moment().toDate());
  const [isByDays, setIsByDays] = useState(true);

  const [nameSearch, setNameSearch] = useState('');
  const [daySearch, setDaySearch] = useState('0');

  const debouncedNameSearch = useDebounce(nameSearch, 300);
  const debouncedDaySearch = useDebounce(daySearch, 300);

  useEffect(() => {
    dispatch(
      getRevShareMessagingAsync({
        startTime: moment(startTime).unix(),
        endTime: moment(endTime).unix(),
        display_by: isByDays ? 'days' : 'dates',
        start_date: selectedDates.start.toDateString(),
        end_date: selectedDates.end.toDateString(),
        client_name: debouncedNameSearch,
        days: Number(debouncedDaySearch),
      }),
    );
  }, [startTime, endTime, isByDays, selectedDates, debouncedDaySearch, debouncedNameSearch]);

  const setNewDates = ({ start, end }: { start: Date; end: Date }) => {
    setStartTime(moment(start).toDate());
    setEndTime(moment(end).toDate());
  };

  return (
    <div className={styles.messaging}>
      <MonthSwitch
        setNewDates={setNewDates}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />

      <div className={styles.messaging_total__wrapper}>
        <MessagingCard title="Total paid messaging days" text="10(5 users)" />
        <MessagingCard title="Total messaging earnings" text="$50" />
      </div>

      {desktopView ? (
        <div>
          <div className={styles.session_details}>
            <h3 className={styles.session_details__title}>Session details</h3>
            <div className={styles.session_details__actions_buttons}>
              <div className={styles.session_details__filters}>
                {Object.entries(filters).map(([key, value]) => (
                  <div
                    key={key}
                    className={classNames({
                      [styles.active]: key === 'by_days' ? isByDays : !isByDays,
                    })}
                  >
                    <Button onClick={() => setIsByDays(key === 'by_days')}>{value}</Button>
                  </div>
                ))}
              </div>
              <div className={styles.session_details__export}>
                <Button>Export</Button>
              </div>
            </div>
          </div>

          <MessagingTable
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            dates={{ start: startTime, end: endTime }}
            isByDays={isByDays}
            setDaySearch={setDaySearch}
            setNameSearch={setNameSearch}
          />
        </div>
      ) : (
        <p>View the desktop version for more details</p>
      )}

      <div />
    </div>
  );
};
