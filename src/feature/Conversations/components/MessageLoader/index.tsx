import React from 'react';
import styles from './loader.module.scss';

export const MessageInitLoader = (): JSX.Element => (
  <div className={styles.wrapper}>
    <div className={styles.dotFlashing} />
  </div>
);
