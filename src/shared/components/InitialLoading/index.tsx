import { Spinner } from '@shopify/polaris';
import React from 'react';
import Header from '../Header';

import styles from './styles.module.scss';

export const InitialLoading = (): JSX.Element => (
  <div className={styles.loadingPage}>
    <Header handleShowMobileNavigation={() => null} showAuthItems={false} />
    <div className={styles.spinner}>
      <Spinner />
    </div>
  </div>
);
