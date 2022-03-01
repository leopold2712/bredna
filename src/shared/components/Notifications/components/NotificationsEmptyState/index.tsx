import React from 'react';
import { Card, EmptyState } from '@shopify/polaris';
import EmptyNotificationIcon from '../../../../../assets/images/notifications/emptyStateIcon.png';
import styles from './emptyState.module.scss';

export const NotificationsEmptyState = (): JSX.Element => (
  <Card>
    <Card.Section>
      <div className={styles.empty_state_text}>
        <EmptyState image={EmptyNotificationIcon} fullWidth heading="No notifications yet" />
      </div>
    </Card.Section>
  </Card>
);
