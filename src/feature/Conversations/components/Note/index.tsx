import { Avatar } from '@shopify/polaris';
import moment from 'moment';
import React from 'react';

import './styles.overload.scss';
import styles from './styles.module.scss';

type Props = {
  message: {
    sender: {
      name: string;
      thumbnail?: string;
      initials?: string;
    };
    body: string;
    createdAt: string;
  };
  source?: 'message' | 'note';
};

export const Note: React.FC<Props> = ({ message: { sender, body, createdAt }, source }: Props) => (
  <div className={source === 'note' ? styles.noteWrapper : styles.messageWrapper}>
    <div className={source === 'note' ? styles.note : styles.message}>
      <div className={source === 'note' ? 'note__overload-avatar' : 'message__overload'}>
        <Avatar source={sender.thumbnail} initials={sender.initials} />
      </div>

      <div className={styles.messageWrapper}>
        <p className={styles.text}>{body}</p>
      </div>
    </div>
    <p className={styles.date}>{moment(createdAt).format('hh:mm')}</p>
  </div>
);
