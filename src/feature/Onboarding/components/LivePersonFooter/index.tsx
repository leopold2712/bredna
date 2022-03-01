import React from 'react';
import livePersonLogoBlack from '../../../../assets/images/signup/liveperson_logo.svg';

import styles from './styles.module.scss';

export const LivePersonFooter = (): JSX.Element => (
  <footer className={styles.footer}>
    By <img className={styles.img} src={livePersonLogoBlack} alt="" />
  </footer>
);
