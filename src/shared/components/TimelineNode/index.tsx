import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import parse from 'html-react-parser';

import note from '../../../assets/images/clients/note.svg';
import chat from '../../../assets/images/clients/chat.svg';
import video from '../../../assets/images/clients/video.svg';
import child from '../../../assets/images/clients/child.svg';

import styles from './styles.module.scss';

enum NodeType {
  Chat = 'chat',
  Sessions = 'session',
  Note = 'note',
}

type TProps = {
  journey: {
    id: number;
    title: string;
    type: string;
    notes: {
      id: number;
      body: string;
      created_at: string;
    }[];
    created_at: string;
  };
  updateNote: (id: number) => void;
  inputPosition?: 'top' | 'bottom';
  width?: 'wide' | 'narrow';
  inputOutside?: boolean;
  showAdd?: boolean;
};

export const TimeLineNode: React.FC<TProps> = ({
  journey,
  inputPosition = 'top',
  width = 'wide',
  inputOutside = false,
  showAdd = true,
  updateNote,
}: TProps): JSX.Element => {
  const parentNodeClassNames = classNames(styles.node, {
    [styles.nodeInputBottom]: inputPosition === 'bottom',
    [styles.narrowNode]: width === 'narrow',
  });

  const childNodeClassNames = classNames(styles.childNode, {
    [styles.narrowNode]: width === 'narrow',
  });

  const firstMessageClassNames = classNames(styles.node__titleCnt, styles.journeyTitle);

  return (
    <>
      <div className={parentNodeClassNames}>
        <div className={styles.node__line}>
          {journey.type === NodeType.Chat && (
            <img className={styles.node__img} src={chat} alt={NodeType.Chat} />
          )}
          {journey.type === NodeType.Sessions && (
            <img className={styles.node__img} src={video} alt={NodeType.Sessions} />
          )}
          {journey.type === NodeType.Note && (
            <img className={styles.node__img} src={note} alt={NodeType.Note} />
          )}
        </div>
        {journey.title && (
          <div className={firstMessageClassNames}>
            <div className={classNames(styles.node__title, 'fs-mask')}>{journey.title}</div>
            <div className={styles.node__titleTime}>
              {moment(journey.created_at).format('MMM DD - hh:mm')}
              {showAdd && !inputOutside && (
                <>
                  &nbsp;
                  <strong>- Add note</strong>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {journey.notes.map((noteItem, index) => (
        <div className={childNodeClassNames} key={index}>
          <div className={styles.childNode__line} />
          <div className={styles.childNode__indent}>
            <div className={styles.childNode__indentIn}>
              <img className={styles.childNode__indentImg} src={child} alt="child" />
            </div>
          </div>
          <div className={styles.childNode__titleCnt}>
            <span className="fs-mask">{parse(noteItem.body)}</span>
            <div className={styles.childNode__titleTime}>
              {moment(noteItem.created_at).format('MMM DD - hh:mm')}
              <button
                type="button"
                className={styles.editButton}
                onClick={() => updateNote(noteItem.id)}
              >
                &nbsp;- <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
