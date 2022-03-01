import { Page, Card, EmptyState } from '@shopify/polaris';
import React from 'react';
import empty from '../../../../assets/images/clients/empty.svg';
import styles from './styles.module.scss';

export const CustomersEmptyState = (): JSX.Element => (
  <Page title="Clients">
    <Card>
      <Card.Section>
        <EmptyState image={empty}>
          <div className={styles.textWrapper}>
            <p className={styles.title}>Sorry, you don’t have any clients yet.</p>
          </div>
        </EmptyState>
      </Card.Section>
    </Card>
  </Page>
);
