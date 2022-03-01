/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Button, Card, Link } from '@shopify/polaris';

import {
  dashboardAnalyticsLog,
  GADashboardTriggers,
} from '../../services/dashboard.google-analytics';

import type { SessionDTO } from '../../../../dtos/session.dto';

import defaultAvatar from '../../../../../assets/images/home/avatar-default.svg';
import styles from './sessionsView.module.scss';

type Props = {
  list: SessionDTO[];
};

export const Sessions: React.FC<Props> = ({ list: sessions }: Props): JSX.Element => {
  const history = useHistory();

  const redirectToSession = (item: SessionDTO) => () => {
    dashboardAnalyticsLog(GADashboardTriggers.SESSION_BOX)();
    history.push(`live-session/${item.id}`, item);
  };

  const onClickViewClients = useCallback(() => {
    history.push('/clients');
  }, []);

  const getThumbnailLink = (item: SessionDTO): string => {
    const link = item.participants.length ? item.participants[0].client.thumbnail : null;
    return link || '';
  };

  return (
    <Card>
      {sessions.length ? (
        <>
          {[...sessions]
            .sort((a, b) => (moment(a.start_time) >= moment(b.start_time) ? 1 : -1))
            .map((item) => (
              <div className={styles.itemWrapper} onClick={redirectToSession(item)} key={item.id}>
                <Card.Section>
                  <div className={styles.item}>
                    <div className={styles.avatarCnt}>
                      {getThumbnailLink(item) ? (
                        <img
                          className={classNames(styles.avatar, 'fs-exclude')}
                          src={getThumbnailLink(item)}
                          alt="avatar"
                        />
                      ) : (
                        <img
                          className={classNames(styles.avatar, 'fs-exclude')}
                          src={defaultAvatar}
                          alt="avatar"
                        />
                      )}
                    </div>
                    <div className={styles.info}>
                      <span className={classNames(styles.line, 'fs-mask')}>
                        {item.participants.length ? item.participants[0].client.name : ''}
                      </span>
                      <span className={styles.line}>
                        {`${moment(item.start_time).format('ddd, MMMM Do')} | ${moment(
                          item.start_time,
                        ).format('hh:mm')}-${moment(item.end_time).format('hh:mm')} `}
                      </span>
                    </div>
                    <Link
                      url={item.start_link}
                      onClick={dashboardAnalyticsLog(GADashboardTriggers.SESSION_LINK)}
                    >
                      Link
                    </Link>
                  </div>
                </Card.Section>
              </div>
            ))}
        </>
      ) : (
        <Card.Section>
          <div className={styles.leftBlock}>
            <div className={styles.blockInfo}>
              <span className={styles.blockTitle}>You have no booked sessions yet...</span>
              <span className={styles.blockText}>
                In order to start your work in Brenda you should set up your availability times
              </span>
            </div>
            <div className={styles.blockBtnCnt}>
              <div className={styles.blockBtn}>
                <Button fullWidth primary onClick={onClickViewClients}>
                  View clients
                </Button>
              </div>
            </div>
          </div>
        </Card.Section>
      )}
    </Card>
  );
};

export const SessionsView = React.memo(Sessions);
