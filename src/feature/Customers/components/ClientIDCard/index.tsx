import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
  mobileView: boolean;
};

export const ClientIDCard = ({ children, mobileView }: Props): JSX.Element => {
  const cardClassName = classNames(styles.card, { [styles.mobileView]: mobileView });

  return <div className={cardClassName}>{children}</div>;
};
