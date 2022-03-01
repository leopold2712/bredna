import React, { ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
  count?: number;
};

export const EditorTitle = ({ children, count }: Props): JSX.Element => (
  <div className={styles.editorTitle}>
    <p>{children}</p>
    <div className={styles.count}>{`${count} / 2000`}</div>
  </div>
);
