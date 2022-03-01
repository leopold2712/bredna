import React from 'react';
import styles from './styles.module.scss';

type Props = {
  index: number;
  text: string;
};

export const Note = ({ index, text }: Props): JSX.Element => (
  <div className={styles.note}>
    <div className={styles.header}>
      <p>{`Note ${index}`}</p>
    </div>
    <div className={styles.body}>
      <p>{text}</p>
    </div>
  </div>
);
