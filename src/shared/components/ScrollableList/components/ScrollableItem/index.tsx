/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

import styles from '../../styles.module.scss';

type Props = {
  label: string;
  value: string;
  onChange: (date: Date) => void;
};

export const ScrollableItem = React.forwardRef<HTMLLIElement, Props>(
  ({ label, value, onChange }: Props, ref): JSX.Element => {
    const handleClick = () => {
      onChange(new Date(value));
    };
    return (
      <li className={styles.scrollable_li} onClick={handleClick} ref={ref}>
        <p>{label}</p>
      </li>
    );
  },
);
