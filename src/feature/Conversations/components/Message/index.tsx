import moment from 'moment';
import React from 'react';
import { Icon } from '@shopify/polaris';
import { FlagMajor } from '@shopify/polaris-icons';
import { ChatMessageDTO } from '../../dtos';
import { containsHeb } from '../../../../shared/utils';
import { useAppDispatch, useAppSelector } from '../../../../main/store/hooks';
import { setChatUI } from '../../store';
import { selectChatUI } from '../../store/selectors';

import styles from './message.module.scss';

type Props = {
  // message: ChatMessageDTO;
  message: {
    id: number;
    createdAt: string;
    body: string;
    sentByMe: boolean;
    sender: {
      name: string;
    };
    noted: boolean;
  };
};

export const ConversationsMessage: React.FC<Props> = ({
  message: { sentByMe, id, body, createdAt, noted },
}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const chatUI = useAppSelector(selectChatUI);
  const openNotesDrawer = () => dispatch(setChatUI({ ...chatUI, noteDrawerOpen: true }));
  return (
    <div
      className={`${styles.messageWrapper} ${
        sentByMe ? styles.personalMessage : styles.otherMessage
      }`}
      key={id}
    >
      <div dir={containsHeb(body) ? 'rtl' : 'ltr'} className={styles.messageBody}>
        {body}
      </div>
      <div className={styles.messageInfo}>
        <span className={styles.date}>{moment(createdAt).format('hh:mm')}</span>

        {noted && (
          <div className={styles.flag}>
            <Icon source={FlagMajor} color="critical" />
          </div>
        )}

        <button className={styles.addNote} onClick={openNotesDrawer} type="button">
          Add note
        </button>
      </div>
    </div>
  );
};
