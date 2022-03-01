import React from 'react';
import styles from './styles.module.scss';

export const ScheduleLegend = (): JSX.Element => (
  <div className={styles.legend}>
    <div className={styles.legendItem}>
      <div className={`${styles.legendPoint} ${styles.vacantColor}`} />
      <span className={styles.legendText}>Vacant</span>
    </div>
    <div className={styles.legendItem}>
      <div className={`${styles.legendPoint} ${styles.bookedColor}`} />
      <span className={styles.legendText}>Booked</span>
    </div>
  </div>
);
