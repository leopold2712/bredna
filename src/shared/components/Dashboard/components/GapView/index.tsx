import React from 'react';
import { Card, Stack } from '@shopify/polaris';

import styles from '../../dashboard.module.scss';

const Gap = () => (
  <Card>
    <Card.Section>
      <Stack vertical>
        <Stack distribution="equalSpacing" alignment="center">
          <div className={`${styles.cardHeader} ${styles.cardHeader_underline}`}>
            Gap of returnig
          </div>
        </Stack>
        <span>&nbsp;</span>
      </Stack>
    </Card.Section>
    <Card.Section>
      <div className={styles.gorHeight}>
        <Stack distribution="equalSpacing">
          <span className={styles.cardHeaderS}>Last 7 days</span>
          <span className={styles.cardCounterS}>0</span>
        </Stack>
        <Stack distribution="equalSpacing">
          <span className={styles.cardHeaderS}>Preceding Period</span>
          <span className={styles.cardCounterS}>0</span>
        </Stack>
      </div>
    </Card.Section>
  </Card>
);

export const GapView = React.memo(Gap);
