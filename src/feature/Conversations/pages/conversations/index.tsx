import React from 'react';
import { Page } from '@shopify/polaris';
import classNames from 'classnames';

import { ConversationsList, DialogHeader } from '../../components';
import { ConversationsListHeader } from '../../components/ConversationsListHeader';
import { useAppSelector } from '../../../../main/store/hooks';
import { selectChatUI } from '../../store/selectors';
import { Views } from '../../store';
import { ChatDialog } from '../../components/ChatDialog';

import styles from './conversations.module.scss';

export const Conversations = (): JSX.Element => {
  const { activeView, mobileView } = useAppSelector(selectChatUI);

  return (
    <Page title="Messaging" fullWidth>
      <div className={classNames(styles.page, 'fs-mask')}>
        <div
          className={`${styles.listWrapper} ${
            mobileView && activeView === Views.DIALOG ? styles.hidden : ''
          }`}
        >
          <ConversationsListHeader />
          <div className={styles.list}>
            <ConversationsList />
          </div>
        </div>
        <div
          className={`${styles.dialogWrapper} ${
            mobileView && activeView === Views.LIST ? styles.hidden : ''
          }`}
        >
          <DialogHeader />
          <div className={styles.dialog}>
            <ChatDialog />
          </div>
        </div>
      </div>
    </Page>
  );
};
