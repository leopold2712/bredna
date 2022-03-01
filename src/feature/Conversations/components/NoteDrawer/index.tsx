import React, { useRef, useState } from 'react';
import { Button, Icon, TextField } from '@shopify/polaris';
import { MobileCancelMajor } from '@shopify/polaris-icons';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';
import moment from 'moment';

import { useOutsideListener } from '../../../../shared/hooks/useOutsideListener';
import { useAppDispatch, useAppSelector } from '../../../../main/store/hooks';
import {
  selectActiveMessage,
  selectActiveRoom,
  selectChatUI,
  selectPersonalChatInfo,
} from '../../store/selectors';
import { setChatUI, setEditedMessage } from '../../store';
import { TimeLineNode } from '../../../../shared/components/TimelineNode';
import { ChatMessageDTO } from '../../dtos';
import { JourneyDTO } from '../../../../shared/dtos/journey.dto';
import { NodeType } from '../../../../shared/constants/node.types';
import { ChatService } from '../../services';
import EditNoteModal, { EditMode } from '../../../../shared/components/EditNodeModal';

import type { ChatNoteDTO } from '../../../../shared/dtos/chat.note.dto';

import styles from './styles.module.scss';

const mapMessageToJourney = (m: ChatMessageDTO | null): JourneyDTO => {
  if (m)
    return {
      id: +m.id,
      title: m.body,
      type: NodeType.Chat,
      created_at: m?.createdAt || new Date().toString(),
      notes: [...m.comments]
        .sort((a, b) => (moment(a.createdAt) > moment(b.createdAt) ? 1 : -1))
        .map((c) => ({ id: c.id, body: c.body, created_at: c.createdAt })),
    };
  return {
    id: 0,
    title: '',
    type: NodeType.Chat,
    created_at: new Date().toString(),
    notes: [],
  };
};

export const NoteDrawer = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isEditOpenRef = useRef(false);
  const wrapper = useRef(null);

  const chatUI = useAppSelector(selectChatUI);
  const message = useAppSelector(selectActiveMessage);
  const room = useAppSelector(selectActiveRoom);
  const user = useAppSelector(selectPersonalChatInfo);

  const [noteLoading, setNoteLoading] = useState(false);
  const [note, setNote] = useState('');
  const [noteForEdit, setNoteForEdit] = useState<ChatNoteDTO>();
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false);

  const noteHandler = (value: string) => setNote(value);

  const closeDrawer = () => {
    if (!isEditOpenRef.current) {
      if (room) ChatService.getMessages(room?.id, 1);
      dispatch(setEditedMessage(null));
      dispatch(setChatUI({ ...chatUI, noteDrawerOpen: false }));
    }
  };

  useOutsideListener(wrapper, closeDrawer);

  const inputSectionClassNames = classNames(styles.section, styles.topPaddingZero);

  const sendNewComment = () => {
    setNoteLoading(true);
    setNote('');

    if (message && room && user) {
      ChatService.addComment({
        userId: user.id,
        messageId: +message?.id,
        roomId: room?.id,
        body: note,
      });

      const comments = [...message?.comments];
      comments.push({
        body: note,
        createdAt: new Date().toString(),
        id: moment().unix(),
      });

      const updatedMessage: ChatMessageDTO = { ...message, comments };
      dispatch(setEditedMessage(updatedMessage));
    }

    setTimeout(() => {
      setNoteLoading(false);
    }, 500);
  };

  const toggleEditNote = () => {
    if (isEditNoteOpen) setNoteForEdit(undefined);
    setIsEditNoteOpen((prev) => {
      isEditOpenRef.current = !prev;
      return !prev;
    });
  };

  const handleEditNote = (id: number) => {
    const comment = message?.comments.find((n) => n.id === id);
    if (comment) {
      setNoteForEdit(comment);
      toggleEditNote();
    }
  };

  const updateNote = (value: string) => {
    setNoteLoading(true);
    if (noteForEdit) {
      const { id } = noteForEdit;

      if (message && room) {
        ChatService.updateComment({
          userId: message.sender.id,
          comment: { id, messageId: message.id, body: value },
        });

        const comments = message.comments.map((comment) => {
          if (comment.id === id) return { ...comment, body: value };
          return comment;
        });

        const updatedMessage: ChatMessageDTO = { ...message, comments };
        dispatch(setEditedMessage(updatedMessage));
      }

      setTimeout(() => {
        setNoteLoading(false);
        toggleEditNote();
      }, 500);
    }
  };

  const journey = mapMessageToJourney(message);

  return (
    <div className={styles.card} ref={wrapper}>
      <div className={styles.header}>
        <p className={styles.modalTitle}>Add note</p>
        <button className={styles.action} type="button" onClick={closeDrawer}>
          <Icon source={MobileCancelMajor} />
        </button>
      </div>
      <div className={styles.scrollable}>
        <div className={classNames(styles.section, 'fs-mask')}>
          <TimeLineNode
            key={uuid()}
            journey={journey}
            width="narrow"
            inputPosition="bottom"
            inputOutside
            updateNote={handleEditNote}
          />
        </div>
      </div>
      <div className={inputSectionClassNames}>
        <div className={styles.inputWrapper}>
          <div className="fs-mask">
            <TextField
              labelHidden
              label="Note"
              onChange={noteHandler}
              value={note}
              multiline
              placeholder="Type a note..."
            />
          </div>
          <div className={styles.button}>
            <Button
              onClick={sendNewComment}
              disabled={note.length === 0 || noteLoading}
              loading={noteLoading}
              primary={note.length > 0}
            >
              Save
            </Button>
          </div>
        </div>
      </div>

      <EditNoteModal
        value={noteForEdit?.body}
        mode={EditMode.Edit}
        isOpen={isEditNoteOpen}
        loading={noteLoading}
        toggleModal={toggleEditNote}
        onNoteSave={updateNote}
      />
    </div>
  );
};
