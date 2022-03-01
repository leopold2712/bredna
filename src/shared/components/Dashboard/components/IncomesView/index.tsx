import React from 'react';
import { Card, Stack } from '@shopify/polaris';

import styles from '../../dashboard.module.scss';

const Incomes = () => (
  <Card>
    <Card.Section>
      <Stack vertical>
        <Stack distribution="equalSpacing" alignment="center">
          <div className={`${styles.cardHeader} ${styles.cardHeader_underline}`}>
            Active clients
          </div>
          <span className={styles.cardCounter}>0</span>
        </Stack>
        <span className={styles.cardTextS}>Since 1st of the current month</span>
      </Stack>
    </Card.Section>
    <Card.Section>
      <div className={styles.acHeight}>
        <Stack distribution="equalSpacing" alignment="center">
          <span className={styles.cardHeaderS}>Passive income</span>
          <span className={styles.cardCounterS}>$0.00</span>
        </Stack>
        <Stack distribution="equalSpacing" alignment="center">
          <span className={styles.cardHeaderS}>Direct income</span>
          <span className={styles.cardCounterS}>$0.00</span>
        </Stack>
      </div>
    </Card.Section>
  </Card>
);

export const IncomesView = React.memo(Incomes);
