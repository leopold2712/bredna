/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Button, Card, Layout } from '@shopify/polaris';
import { useHistory } from 'react-router';
import { SessionsView } from './components/SessionsView';
import { MessagesView } from './components/MessagesView';
import { ScheduleView } from './components/ScheduleView';
import { LocalLoader } from '../LocalLoader';
import { SessionDTO } from '../../dtos/session.dto';
import { GetSlotsResponseDTO } from '../../../feature/OneToOneSession/dtos/getSlots.response.dto';
import { useAppSelector } from '../../../main/store/hooks';
import { dashboardAnalyticsLog, GADashboardTriggers } from './services/dashboard.google-analytics';

import styles from './dashboard.module.scss';

type Props = {
  schedule?: {
    slotsList: GetSlotsResponseDTO[];
    loaded: boolean;
    loading: boolean;
    currentScheduleDate: Date;
    updateSchedule: (date: Date) => void;
    visible: boolean;
  };
  sessions?: {
    sessionsList: SessionDTO[];
    loaded: boolean;
  };
};
const Dashboard: React.FC<Props> = ({ schedule, sessions }: Props): JSX.Element => {
  const history = useHistory();

  const navigateToLiveSession = () => {
    dashboardAnalyticsLog(GADashboardTriggers.SESSION_ALL)();
    history.push('/live-session');
  };

  const navigateToChat = () => {
    history.push('/chat');
  };

  const messages = useAppSelector((state) => state.dashboard.messages);

  return (
    <Layout>
      <Layout.Section fullWidth>
        <div className={styles.layoutCnt}>
          <div className={styles.layoutWs}>
            <div className={styles.subHeaderContainer}>
              <div className={styles.subHeaderPosition}>
                <div className={styles.header}>
                  <span className={styles.title}>Weekly schedule</span>
                </div>
              </div>
            </div>
            {schedule?.loaded ? (
              <ScheduleView
                list={schedule.slotsList}
                updateSchedule={schedule.updateSchedule}
                currentDate={schedule.currentScheduleDate}
                loading={schedule.loading}
                visible={schedule.visible}
              />
            ) : (
              <Card>
                <Card.Section>
                  <div className={styles.loaderWrapper}>
                    <LocalLoader />
                  </div>
                </Card.Section>
              </Card>
            )}
          </div>

          <div className={styles.layoutNs}>
            <div className={styles.subHeaderContainer}>
              <div className={styles.subHeaderPosition}>
                <div className={styles.header}>
                  <span className={styles.title}>Next sessions</span>
                  {sessions && sessions?.sessionsList.length > 0 && (
                    <Button plain onClick={navigateToLiveSession}>
                      See All
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {sessions?.loaded ? (
              <SessionsView list={sessions.sessionsList} />
            ) : (
              <Card>
                <Card.Section>
                  <div className={styles.loaderWrapper}>
                    <LocalLoader />
                  </div>
                </Card.Section>
              </Card>
            )}
          </div>

          {/* <div className={styles.layoutLm}>
            <div className={styles.subHeaderContainer}>
              <div className={styles.subHeaderPosition}>
                <div className={styles.header}>
                  <span className={styles.title}>Unread messages</span>
                  {messages.length > 0 && (
                    <Button plain onClick={navigateToChat}>
                      See All
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <MessagesView />
          </div> */}
        </div>
      </Layout.Section>
    </Layout>
  );
};
export default Dashboard;
