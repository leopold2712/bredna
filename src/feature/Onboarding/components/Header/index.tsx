import React from 'react';
import logoWithText from '../../../../assets/images/logo-with-text.svg';

import styles from './styles.module.scss';

export const Header = (): JSX.Element => (
  <div className={styles.header}>
    <div className={styles.logo}>
      <img src={logoWithText} alt="logo" />
    </div>
  </div>
);
