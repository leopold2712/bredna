import { Spinner } from '@shopify/polaris';
import React from 'react';
import styles from './styles.module.scss';

export const LocalLoader: React.FC = () => (
  <div className={styles.loader}>
    <div className={styles.spinner}>
      <Spinner />
    </div>
  </div>
);
