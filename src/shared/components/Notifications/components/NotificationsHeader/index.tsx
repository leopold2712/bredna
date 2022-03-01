import React, { useState, useCallback } from 'react';
import { Icon, Popover, ActionList, TextContainer, Heading } from '@shopify/polaris';
import { MobileHorizontalDotsMajor } from '@shopify/polaris-icons';
import styles from './header.module.scss';

type Props = {
  handleMarkAllAsRead: () => void;
  disableMarkAll?: boolean;
};

export const NotificationHeader = ({ handleMarkAllAsRead, disableMarkAll }: Props): JSX.Element => {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(() => setPopoverActive((prev) => !prev), []);

  const activator = (
    <button className={styles.action} type="button" onClick={togglePopoverActive}>
      <Icon source={MobileHorizontalDotsMajor} />
    </button>
  );
  const actions = [];
  if (!disableMarkAll) actions.push({ content: 'Mark all as read', onAction: handleMarkAllAsRead });

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <TextContainer>
          <Heading>Notifications</Heading>
        </TextContainer>
      </div>

      {actions.length !== 0 && (
        <Popover active={popoverActive} activator={activator} onClose={togglePopoverActive}>
          <div className={styles.actions}>
            <Popover.Pane>
              <ActionList items={actions} />
            </Popover.Pane>
          </div>
        </Popover>
      )}
    </div>
  );
};
