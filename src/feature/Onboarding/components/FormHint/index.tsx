import React, { ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
};

export const FormHint = ({ children }: Props): JSX.Element => (
  <div className={styles.hint}>
    <p className={styles.text}>{children}</p>
  </div>
);
