import React, { ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
};

export const FormTitle = ({ children }: Props): JSX.Element => (
  <h1 className={styles.formTitle}>{children}</h1>
);
