import React from 'react';

import styles from './styles.module.scss';

interface IProps {
  text?: string;
}

export const Divider: React.FC<IProps> = ({ text }: IProps) => (
  <div className={styles.divider}>
    {text && <div className={styles.dividerInfo}>{text}</div>}
    <div className={styles.dividerLine} />
  </div>
);
