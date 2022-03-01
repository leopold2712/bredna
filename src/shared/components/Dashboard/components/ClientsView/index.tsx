import React from 'react';
import { Card, Stack } from '@shopify/polaris';

import styles from '../../dashboard.module.scss';

const Clients = () => (
  <Card>
    <Card.Section>
      <Stack vertical>
        <Stack distribution="equalSpacing" alignment="center">
          <div className={`${styles.cardHeader} ${styles.cardHeader_underline}`}>
            Returning clients
          </div>
        </Stack>
        <span className={styles.cardTextS}>Last 7 days growth</span>
      </Stack>
    </Card.Section>

    <Card.Section>
      <div className={styles.rcHeight}>
        <Stack distribution="center" spacing="extraTight" alignment="center">
          <div className={styles.cardTextL}>
            <span>0</span>
            <span>/</span>
            <span>0</span>
          </div>
        </Stack>
        <Stack distribution="center" spacing="extraTight" alignment="center">
          <div>
            <span className={styles.newTotal}>New&nbsp;</span>
            <span className={styles.newTotal}>/</span>
            <span className={styles.newTotal}>&nbsp;Total</span>
          </div>
        </Stack>
      </div>
    </Card.Section>
  </Card>
);

export const ClientsView = React.memo(Clients);
