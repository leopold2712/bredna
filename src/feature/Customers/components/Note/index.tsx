import React from 'react';
import { Button } from '@shopify/polaris';
import parse from 'html-react-parser';
import moment from 'moment';
import { NodeType } from '../../dtos/nodeType.dto';
import { NoteDTO } from '../../dtos/note.dto';

import note from '../../../../assets/images/clients/note.svg';
import chat from '../../../../assets/images/clients/chat.svg';
import video from '../../../../assets/images/clients/video.svg';

import styles from './styles.module.scss';

type Props = {
  type: NodeType;
  title: string;
  note: NoteDTO;
  onClick: (value: string, id: number) => void;
};

const getImgSource = (type: NodeType) => {
  switch (type) {
    case NodeType.Chat:
      return chat;
    case NodeType.Note:
      return note;
    case NodeType.Sessions:
      return video;
    default:
      return note;
  }
};

export const Note = ({ note, type, title, onClick }: Props): JSX.Element => {
  const handleClick = () => {
    onClick(note.body, note.id);
  };

  return (
    <div className={styles.note}>
      <div className={styles.topRow}>
        <img src={getImgSource(type)} alt="note_img" />
        <p className={styles.title}>{title || 'Note'}</p>

        <div className={styles.info}>
          <p className={styles.dateTime}>{moment(note.created_at).format('MMM DD, YYYY')}</p>
          <span className={styles.ellipse} />
          <p className={styles.dateTime}>{moment(note.created_at).format('HH:mm')}</p>
        </div>

        <div className={styles.editButton}>
          <Button plain monochrome onClick={handleClick}>
            Edit
          </Button>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <p className={styles.description}>{parse(note.body)}</p>
      </div>
    </div>
  );
};
