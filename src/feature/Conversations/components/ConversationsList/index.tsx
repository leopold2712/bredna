import React, { useEffect } from 'react';
import { ConversationCard } from '..';
import { useAppSelector } from '../../../../main/store/hooks';
import { ChatService } from '../../services';
import { selectActiveRoom, selectChatLoading, selectChatRooms } from '../../store/selectors';
import { EmptyDialogsList } from '../EmptyDialogsList';
import { MessageInitLoader } from '../MessageLoader';

import styles from './list.module.scss';

export const ConversationsList = (): JSX.Element => {
  const rooms = useAppSelector(selectChatRooms);
  const activeRoom = useAppSelector(selectActiveRoom);

  const loading = useAppSelector(selectChatLoading);

  useEffect(
    () => () => {
      if (activeRoom) ChatService.disconnectRoom(activeRoom?.id);
    },
    [],
  );

  return (
    <div className={styles.list}>
      {loading && (
        <div className={styles.listLoader}>
          <MessageInitLoader />
        </div>
      )}

      {!loading && rooms.all.length === 0 && <EmptyDialogsList />}

      {rooms.filtered.map((room, index) => (
        <ConversationCard room={room} source="list" key={index} />
      ))}
    </div>
  );
};
