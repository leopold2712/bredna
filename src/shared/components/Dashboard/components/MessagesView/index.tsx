import React, { useState } from 'react';
import { Avatar, Button, Card } from '@shopify/polaris';
import { useHistory } from 'react-router';
import { useAppSelector } from '../../../../../main/store/hooks';

import styles from './messagesView.module.scss';

export const Messages: React.FC = (): JSX.Element => {
  const [viewMessages, setViewMessages] = useState(false);
  const messages = useAppSelector((state) => state.dashboard.messages);
  const history = useHistory();

  const redirectToMessages = () => history.push('/chat');

  return (
    <Card>
      {viewMessages ? (
        <>
          {messages.map((item) => (
            <Card.Section>
              <div className={styles.item}>
                <div className={styles.avatar}>
                  <Avatar customer />
                </div>
                <div className={styles.infoCnt}>
                  <div className={styles.info}>
                    <span className={styles.fullName}>{item.fullName}</span>
                    <span className={styles.description}>{item.description}</span>
                  </div>
                  <div className={styles.counterCnt}>
                    <div className={styles.counter}>{item.counter}</div>
                  </div>
                </div>
              </div>
            </Card.Section>
          ))}
        </>
      ) : (
        <Card.Section>
          <div className={styles.leftBlock}>
            <div className={styles.blockInfo}>
              <span className={styles.blockTitle}>You have no messages yet...</span>
            </div>
            <div className={styles.blockBtnCnt}>
              <div className={styles.blockBtn}>
                <Button fullWidth onClick={redirectToMessages}>
                  Message here
                </Button>
              </div>
            </div>
          </div>
        </Card.Section>
      )}
    </Card>
  );
};

export const MessagesView = React.memo(Messages);
