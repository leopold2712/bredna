import React from 'react';
import { Avatar } from '@shopify/polaris';
import moment from 'moment';
import classNames from 'classnames';

import { ChatService } from '../../services';
import { useAppDispatch, useAppSelector } from '../../../../main/store/hooks';
import { selectActiveRoom, selectChatUI, selectClientInfo } from '../../store/selectors';
import { setActiveRoom, setChatUI, Views } from '../../store';
import { ChatRoomDTO } from '../../dtos';

import styles from './card.module.scss';

type Props = {
  room: ChatRoomDTO; // RoomModel;
  source: 'list' | 'header';
};

export const ConversationCard: React.FC<Props> = ({ room, source }: Props): JSX.Element => {
  const activeRoom = useAppSelector(selectActiveRoom);
  const chatUI = useAppSelector(selectChatUI);

  const dispatch = useAppDispatch();

  const updateActiveRoom = () => {
    // prevent action in header
    if (source === 'header') return;

    dispatch(setActiveRoom(room));

    /* disconnect from current room */
    if (activeRoom) ChatService.disconnectRoom(activeRoom?.id);

    ChatService.connectRoom(room);

    if (chatUI.mobileView) dispatch(setChatUI({ ...chatUI, activeView: Views.DIALOG }));
  };

  const { id, thumbnail, name, lastMessage } = room;

  const unreadMessages = 3;
  const isPaid = Boolean(useAppSelector(selectClientInfo)?.current_plans);

  const initials = name[0] + name[name.indexOf(' ') + 1];

  const active = activeRoom?.id === id;

  return (
    <button
      className={`${styles.wrapper} ${active && !chatUI.mobileView ? styles.active : ''}`}
      onClick={updateActiveRoom}
      type="button"
      key={id}
      id={id.toString()}
    >
      <div className={styles.headerInfo}>
        {isPaid ? (
          <div className={`${styles.plan} ${styles.plan_active}`}>
            <p>Active Paid Plan</p>
          </div>
        ) : (
          <div className={`${styles.plan} ${styles.plan_expired}`}>
            <p>Expired Plans</p>
          </div>
        )}

        {lastMessage && (
          <div className={styles.date}>{moment(lastMessage?.createdAt).format('DD/MM/YYYY')}</div>
        )}
      </div>

      <div className={styles.mainInfo}>
        <div className={classNames(styles.avatar, 'fs-exclude')}>
          {thumbnail ? <Avatar source={thumbnail} /> : <Avatar initials={initials} />}
        </div>
        <div className={styles.content}>
          <div className={styles.name}>{name}</div>
          {lastMessage && <div className={styles.message}>{lastMessage.body}</div>}

          <div className={styles.icons}>
            {unreadMessages > 0 && <div className={styles.unread}>{unreadMessages}</div>}
          </div>
        </div>
      </div>
    </button>
  );
};
