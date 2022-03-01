import React, { ReactNode } from 'react';
import { Header } from '../Header';
import { LivePersonFooter } from '../LivePersonFooter';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
};

export const PageTemplate = ({ children }: Props): JSX.Element => (
  <div className={styles.page}>
    <div className={styles.innerContent}>
      <Header />
      <div className={styles.outerWrapper}>
        <div className={styles.signinPage}>{children}</div>
      </div>
      <LivePersonFooter />
    </div>
  </div>
);
