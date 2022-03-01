import React from 'react';
import styles from './loader.module.scss';

export const ChatDialogInitLoader = (): JSX.Element => (
  <div className={styles.wrapper}>
    <div className={styles.dotFlashing} />
  </div>
);
