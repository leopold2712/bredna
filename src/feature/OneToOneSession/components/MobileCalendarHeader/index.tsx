import React from 'react';
import moment from 'moment';
import chevronLeft from '../../../../assets/images/icons/chevronLeft.svg';
import chevronRight from '../../../../assets/images/icons/chevronRight.svg';

import styles from './styles.module.scss';

type Props = {
  date: Date;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  decreaseMonth(): void;
  increaseMonth(): void;
};

export const MobileCalendarHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: Props): JSX.Element => (
  <div className={styles.calendarHeader}>
    <button onClick={decreaseMonth} type="button" disabled={prevMonthButtonDisabled}>
      <img src={chevronLeft} alt="left" />
    </button>

    <p>{moment(date).format('MMMM yyyy')}</p>

    <button onClick={increaseMonth} type="button" disabled={nextMonthButtonDisabled}>
      <img src={chevronRight} alt="right" />
    </button>
  </div>
);
