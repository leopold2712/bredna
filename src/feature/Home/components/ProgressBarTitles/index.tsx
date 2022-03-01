import React from 'react';
import styles from './progressBarTitles.module.scss';

type Props = {
  titles: string[];
  activeStep: number;
};

export const ProgressBarTitles: React.FC<Props> = ({ titles, activeStep }: Props) => (
  <div className={styles.progressTitle__wrapper}>
    {titles.map((title, index) => (
      <div
        key={index}
        className={`${styles.progressTitle__item} ${index <= activeStep ? styles.active : ''}`}
      >
        {title}
      </div>
    ))}
  </div>
);
