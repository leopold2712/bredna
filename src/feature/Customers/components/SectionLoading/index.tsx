import React from 'react';
import { Spinner } from '@shopify/polaris';

import styles from './styles.module.scss';

export const SectionLoading = (): JSX.Element => (
  <div className={styles.loading}>
    <Spinner />
  </div>
);
