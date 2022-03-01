import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
  paddingTop?: boolean;
};

export const SectionTitle = ({ children, paddingTop }: Props): JSX.Element => {
  const className = classNames(styles.sectionTitle, { [styles.paddingTop]: paddingTop });

  return (
    <div className={className}>
      <h1>{children}</h1>
      <span className={styles.divider} />
    </div>
  );
};
