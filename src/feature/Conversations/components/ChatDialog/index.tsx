import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';
import { ChatDialogMessage } from './components/Message';
import { ChatDialogInput } from './components/Input';
import { ChatDialogLoader } from './components/Loader';
import { ChatDialogInitLoader } from './components/MessageLoader';
import { ChatDialogBanner } from './components/Banner';

import { useAppDispatch } from '../../../../main/store';
import { useAppSelector } from '../../../../main/store/hooks';
import { selectActiveRoom, selectChatMessages, selectChatUI } from '../../store/selectors';
import { ChatService } from '../../services';
import { ChatMessageDTO } from '../../dtos';
import { setChatUI, setEditedMessage, setSendMessageLoading } from '../../store';

import styles from './dialog.module.scss';

export const ChatDialog = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const chatUI = useAppSelector(selectChatUI);

  const activeRoom = useAppSelector(selectActiveRoom);

  const [message, setMessage] = useState('');

  const { list, pagination, messagesLoading } = useAppSelector(selectChatMessages);

  const { pageNumber, totalPages } = pagination;
  const hasMore = pageNumber < totalPages;

  const onSendMessage = async () => {
    if (!message.length) return;
    setMessage('');
    dispatch(setSendMessageLoading(true));
    if (activeRoom) ChatService.sendMessage(activeRoom.id, message);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // enter - send, shift + enter - new line
      e.preventDefault();
      onSendMessage();
    }
  };

  const fetchNextPage = () => {
    if (activeRoom) ChatService.getMessages(activeRoom?.id, pageNumber + 1);
  };

  const openNoteDrawer = (activeMessage: ChatMessageDTO) => {
    if (!chatUI.noteDrawerOpen) dispatch(setChatUI({ ...chatUI, noteDrawerOpen: true }));
    dispatch(setEditedMessage(activeMessage));
  };

  return (
    <div className={styles.dialog}>
      <div id="scrollableDiv" className={styles.list}>
        {messagesLoading ? (
          <ChatDialogInitLoader />
        ) : (
          <InfiniteScroll
            dataLength={list.length}
            next={fetchNextPage}
            style={{ display: 'flex', flexDirection: 'column-reverse', overflow: 'hidden' }}
            hasMore={hasMore}
            loader={<ChatDialogLoader />}
            scrollableTarget="scrollableDiv"
            inverse
          >
            {list.map((item, index) => {
              const prev = list[index + 1];
              const date = item?.createdAt;
              if (
                moment(prev?.createdAt).format('DD.MM.YYYY') !==
                  moment(date).format('DD.MM.YYYY') &&
                prev?.body
              ) {
                return (
                  <>
                    <ChatDialogMessage message={item} key={index} onAddNoteClick={openNoteDrawer} />
                    <span className={styles.dateSeparator} key={+new Date()}>
                      {moment(item.createdAt).format('DD MMMM YYYY')}
                    </span>
                  </>
                );
              }
              return (
                <ChatDialogMessage message={item} key={index} onAddNoteClick={openNoteDrawer} />
              );
            })}
            <ChatDialogBanner />
          </InfiniteScroll>
        )}
      </div>
      <div className={styles.input}>
        <ChatDialogInput
          currentMsgValue={message}
          onChange={setMessage}
          handleOnKeyDown={handleOnKeyDown}
          onSend={onSendMessage}
          disabled={messagesLoading || !activeRoom || activeRoom.status !== 'active'}
        />
      </div>
    </div>
  );
};
