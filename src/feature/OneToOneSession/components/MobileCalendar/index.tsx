import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { useAppSelector } from '../../../../main/store/hooks';
import { getDaysWithSessions } from '../../store/selectors';
import { MobileCalendarHeader } from '../MobileCalendarHeader';
import { SessionDotsCalendar } from '../SessionDotsCalendar';

import 'react-datepicker/dist/react-datepicker.css';
import './style.overload.scss';

type Props = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  setSelectedMonth: (date: Date) => void;
};

export const MobileCalendar = ({
  selectedDate,
  setSelectedDate,
  setSelectedMonth,
}: Props): JSX.Element => {
  const daysWithSessions = useAppSelector(getDaysWithSessions);

  const renderDayContents = (day: number, date: Date) => (
    <div className="mobile-calendar__custom-day">
      {day}
      {(daysWithSessions as { [name: string]: number })[moment(date).format('DD.MM.YYYY')] && (
        <SessionDotsCalendar
          amount={
            (daysWithSessions as { [name: string]: number })[moment(date).format('DD.MM.YYYY')]
          }
        />
      )}
    </div>
  );

  const handleDateChange = (arg: Date) => {
    setSelectedDate(arg);
    if (moment(selectedDate).get('month') !== moment(arg).get('month')) setSelectedMonth(arg);
  };
  const handleMonthChange = (arg: Date) => setSelectedMonth(arg);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      renderDayContents={renderDayContents}
      inline
      className="mobile-calendar"
      renderCustomHeader={(props) => <MobileCalendarHeader {...props} />}
      onMonthChange={handleMonthChange}
    />
  );
};
