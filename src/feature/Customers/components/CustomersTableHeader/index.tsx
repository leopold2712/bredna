import React from 'react';
import styles from './customersTableHeader.module.scss';

type Props = {
  items: string[];
};

export const CustomersTableHeader: React.FC<Props> = ({ items }: Props) => (
  <div className={styles.wrapper}>
    {items.map((item) => (
      <div className={styles.cell} key={item}>
        {item}
      </div>
    ))}
  </div>
);
