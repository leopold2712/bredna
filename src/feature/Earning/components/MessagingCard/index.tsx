import React, { FC } from 'react';

import styles from './styles.module.scss';

type TProps = {
  title: string;
  text: string;
};

export const MessagingCard: FC<TProps> = ({ title, text }: TProps) => (
  <div className={styles.messaging_total__item}>
    <h4 className={styles.messaging_total__title}>{title}</h4>
    <p className={styles.messaging_total__text}>{text}</p>
  </div>
);
