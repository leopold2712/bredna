import moment from 'moment';
import React from 'react';
import { Icon } from '@shopify/polaris';
import { FlagMajor } from '@shopify/polaris-icons';
import { containsHeb } from '../../../../../../shared/utils';
import styles from './message.module.scss';
import { ChatMessageDTO } from '../../../../dtos';

type Props = {
  message: ChatMessageDTO;
  onAddNoteClick: (message: ChatMessageDTO) => void;
};

export const ChatDialogMessage: React.FC<Props> = ({
  message,
  onAddNoteClick,
}: Props): JSX.Element => {
  const { sentByMe, body, createdAt, id } = message;
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

        {/* {noted && (
        <div className={styles.flag}>
          <Icon source={FlagMajor} color="critical" />
        </div>
      )} */}

        <button className={styles.addNote} onClick={() => onAddNoteClick(message)} type="button">
          Add note
        </button>
      </div>
    </div>
  );
};
