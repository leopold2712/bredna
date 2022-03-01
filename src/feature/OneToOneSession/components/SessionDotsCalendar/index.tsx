import React from 'react';
import styles from './styles.module.scss';

type Props = {
  amount: number;
};

export const SessionDotsCalendar = ({ amount }: Props): JSX.Element => {
  const dots: JSX.Element[] = [];

  for (let i = 0; i < amount; i += 1) {
    if (i + 1 === 3) {
      dots[1] = <span className={styles.dotLabel}>{`+${amount - 1}`}</span>;
      i = amount;
    } else {
      dots.push(<span className={styles.dot} />);
    }
  }
  return <div className={`${styles.dots} ${amount > 2 ? styles.dotsWithLabel : ''}`}>{dots}</div>;
};
