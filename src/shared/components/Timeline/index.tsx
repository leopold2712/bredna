import { Avatar, Button, Checkbox, Heading, TextStyle } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import moment from 'moment';
import './timeline.scss';
import { useSelector } from 'react-redux';
import smile from '../../../assets/images/timeline/smile.png';
import type { RootState } from '../../../main/store/rootReducer';
import type { AuthState } from '../../../feature/Onboarding/store';

const styles = {
  bubble: {
    backgroundColor: '#173630',
    width: '16px',
    height: '16px',
    border: 'none',
    left: '8px',
    top: '43px',
  },
  content: {
    background: 'none',
    fontSize: '14px',
    boxShadow: 'none',
  },
  title: {
    fontSize: '12px',
    paddingLeft: '1em',
    color: '#637381',
  },
  timeline: {
    paddingTop: '40px',
  },
};

const defaultData = [
  {
    id: '1',
    title: 'Dean Pienica archived this order.',
    dateTime: new Date(),
  },
  {
    id: '2',
    title: 'Dean Pienica placed this order on Online Store (checkout #1050)',
    dateTime: new Date('2020-04-13'),
  },
  {
    id: '3',
    title: 'Dean Pienica placed this order on Online Store (checkout #1050)',
    dateTime: new Date('2020-04-10'),
  },
  {
    id: '4',
    title: 'Dean Pienica tried the free trial.',
    dateTime: new Date('2020-02-10'),
  },
];

type IProps = {
  showMessage?: boolean;
  timelineData?: {
    timestamp: number;
    name: string;
    description: string;
  }[];
  sendCommentAsync?: (comment: string) => void;
};

const TimelineComponent: React.FC<IProps> = ({
  showMessage = false,
  timelineData,
  sendCommentAsync,
}: IProps) => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setComment(event.currentTarget.value);
  const onClick = () => {
    if (sendCommentAsync) {
      sendCommentAsync(comment);
    }
    setComment('');
  };

  const data = timelineData
    ? timelineData
        .map((timeline, index) => ({
          id: String(index),
          title: timeline.description,
          dateTime: new Date(timeline.timestamp),
        }))
        .sort((a, b) => (a.dateTime > b.dateTime ? -1 : 1))
    : defaultData.sort((a, b) => (a.dateTime > b.dateTime ? -1 : 1));

  const checkboxHandler = useCallback((value: boolean) => setShowComments(value), []);

  const { user } = useSelector<RootState, AuthState>((state) => state.auth);

  const personalName = `${user?.first_name} ${user?.last_name}`;
  const initials = personalName
    .split(' ')
    .map((name) => (name.length > 0 ? name[0] : ''))
    .join('');

  return (
    <div>
      <div className="timeline__header">
        <Heading>Timeline</Heading>
        {showMessage && (
          <Checkbox label="Show comments" checked={showComments} onChange={checkboxHandler} />
        )}
      </div>

      {showMessage && (
        <div className="timeline__input__wrapper">
          <Avatar initials={initials} />
          <div className="input">
            <input
              type="text"
              placeholder="Leave a comment..."
              value={comment}
              onChange={onChange}
            />
            <button type="button" className="smile__button">
              <img src={smile} alt="smile" />
            </button>
            <Button onClick={onClick}>Post</Button>
          </div>
        </div>
      )}
      <Timeline lineColor="#DFE3E8" style={styles.timeline}>
        {data.map((event, index) => (
          <div key={event.id}>
            {index !== 0 && (
              <div style={{ height: '2rem', borderTop: '#E5E5E5 1px solid', margin: '0 -2.5%' }} />
            )}
            <TimelineEvent
              title={
                moment(event.dateTime).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY') ? (
                  <p
                    style={{
                      paddingLeft: '14px',
                      color: '#637381',
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                    }}
                  >
                    Today
                  </p>
                ) : (
                  <p
                    style={{
                      paddingLeft: '14px',
                      color: '#637381',
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                    }}
                  >
                    {moment(event.dateTime).format('MMMM DD, YYYY')}
                  </p>
                )
              }
              bubbleStyle={styles.bubble}
              contentStyle={styles.content}
              titleStyle={styles.title}
            >
              <div className="timeline__event">
                <TextStyle>{`${event.title}`}</TextStyle>
                <TextStyle variation="subdued">{moment(event.dateTime).format('HH:mma')}</TextStyle>
              </div>
            </TimelineEvent>
          </div>
        ))}
      </Timeline>
    </div>
  );
};

export default TimelineComponent;
