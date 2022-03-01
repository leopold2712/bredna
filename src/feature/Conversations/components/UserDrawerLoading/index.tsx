import { Spinner } from '@shopify/polaris';
import React from 'react';

import styles from './styles.module.scss';

export const UserDrawerLoading = (): JSX.Element => (
  <div className={styles.userDrawerLoading}>
    <Spinner />
  </div>
);
