import React, { useEffect } from 'react';
import ReactSwitch from 'react-switch';
import { Card, Layout, Page, Stack, TextStyle } from '@shopify/polaris';
import { useFormik } from 'formik';
import { useAppDispatch } from '../../../../main/store/hooks';
import { MenuPages } from '../../../../shared/components/SideMenu/models/SideMenuState';
import { setMenuItem } from '../../../../shared/components/SideMenu';

import styles from './styles.module.scss';
import './styles.overload.scss';

const initialValues = {
  newClient: false,
  clientPurchased: false,
  clientCancelledAutoRenewal: false,
  clientSetSession: false,
  clientCancelledSession: false,
  clientRescheduledSession: false,
  weeklyUpcomingSession: false,
  sessionIsAboutToStart: false,
  monthlyReminderToSetAvailability: false,
  clientSentMessage: false,
  kindReminderPleaseAnswerClientsMessage: false,
  reminderClientIsStillWaitingOnYourReply: false,
  clientSentUrgentMessage: false,
  tipsWithClients: false,
  surveys: false,
  productUpdates: false,
  reviewLeft: false,
};

const Notifications: React.FC = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    dispatch(setMenuItem(MenuPages.Settings));
  }, []);

  const onSwitchChange = (
    checked: boolean,
    event: MouseEvent | React.SyntheticEvent<MouseEvent | KeyboardEvent, Event>,
    id: string,
  ) => {
    formik.handleChange({ target: { id, value: checked } });
  };

  return (
    <Page title="Notifications" breadcrumbs={[{ content: 'Settings', url: `/settings` }]}>
      <div className="notifications__overload">
        <Layout sectioned>
          <Layout.AnnotatedSection title="Clients">
            <Card sectioned>
              <div className={styles.cardSection}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <TextStyle>New client</TextStyle>
                  </Stack.Item>
                  <ReactSwitch
                    id="newClient"
                    onChange={onSwitchChange}
                    checked={formik.values.newClient}
                    handleDiameter={22}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#248ad3"
                    offColor="#C1C8D7"
                    disabled={false}
                  />
                </Stack>
              </div>
              <div className={styles.cardSection}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <TextStyle>Client purchased</TextStyle>
                  </Stack.Item>
                  <ReactSwitch
                    id="clientPurchased"
                    onChange={onSwitchChange}
                    checked={formik.values.clientPurchased}
                    handleDiameter={22}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#248ad3"
                    offColor="#C1C8D7"
                    disabled={false}
                  />
                </Stack>
              </div>
              <div className={styles.cardSection}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <TextStyle>Client cancelled auto renewal</TextStyle>
                  </Stack.Item>
                  <ReactSwitch
                    id="clientCancelledAutoRenewal"
                    onChange={onSwitchChange}
                    checked={formik.values.clientCancelledAutoRenewal}
                    handleDiameter={22}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#248ad3"
                    offColor="#C1C8D7"
                    disabled={false}
                  />
                </Stack>
              </div>
            </Card>
          </Layout.AnnotatedSection>

          <Layout.AnnotatedSection title="Live sessions">
            <Card sectioned>
              <div className={styles.cardSection}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <TextStyle>Client set session</TextStyle>
                  </Stack.Item>
                  <ReactSwitch
                    id="clientSetSession"
                    onChange={onSwitchChange}
                    checked={formik.values.clientSetSession}
                    handleDiameter={22}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#248ad3"
                    offColor="#C1C8D7"
                    disabled={false}
                  />
                </Stack>
              </div>
              <div className={styles.cardSection}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <TextStyle>Client cancelled session</TextStyle>
                  </Stack.Item>
                  <ReactSwitch
                    id="clientCancelledSession"
                    onChange={onSwitchChange}
                    checked={formik.values.clientCancelledSession}
                    handleDiameter={22}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#248ad3"
                    offColor="#C1C8D7"
                    disabled={false}
                  />
                </Stack>
              </div>
              <div className={styles.cardSection}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <TextStyle>Client rescheduled session</TextStyle>
                  </Stack.Item>
                  <ReactSwitch
                    id="clientRescheduledSession"
                    onChange={onSwitchChange}
                    checked={formik.values.clientRescheduledSession}
                    handleDiameter={22}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#248ad3"
                    offColor="#C1C8D7"
                    disabled={false}
                  />
                </Stack>
              </div>
              <div className={styles.cardSection}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <TextStyle>Weekly upcoming session</TextStyle>
                  </Stack.Item>
                  <ReactSwitch
                    id="weeklyUpcomingSession"
                    onChange={onSwitchChange}
                    checked={formik.values.weeklyUpcomingSession}
                    handleDiameter={22}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#248ad3"
                    offColor="#C1C8D7"
                    disabled={false}
                  />
                </Stack>
              </div>
              <div className={styles.cardSection}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <TextStyle>Session is about to start</TextStyle>
                  </Stack.Item>
                  <ReactSwitch
                    id="sessionIsAboutToStart"
                    onChange={onSwitchChange}
                    checked={formik.values.sessionIsAboutToStart}
                    handleDiameter={22}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#248ad3"
                    offColor="#C1C8D7"
                    disabled={false}
                  />
                </Stack>
              </div>
              <div className={styles.cardSection}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <TextStyle>Monthly reminder to set availability</TextStyle>
                  </Stack.Item>
                  <ReactSwitch
                    id="monthlyReminderToSetAvailability"
                    onChange={onSwitchChange}
                    checked={formik.values.monthlyReminderToSetAvailability}
                    handleDiameter={22}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#248ad3"
                    offColor="#C1C8D7"
                    disabled={false}
                  />
                </Stack>
              </div>
            </Card>
          </Layout.AnnotatedSection>

          <Layout.AnnotatedSection title="Messaging">
            <Card sectioned>
              <div className={styles.cardSection}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <TextStyle>Client sent message</TextStyle>
                  </Stack.Item>
                  <ReactSwitch
                    id="clientSentMessage"
                    onChange={onSwitchChange}
                    checked={formik.values.clientSentMessage}
                    handleDiameter={22}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#248ad3"
                    offColor="#C1C8D7"
                    disabled={false}
                  />
                </Stack>
              </div>
              <div className={styles.cardSection}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <TextStyle>Kind reminder: please answer clients message</TextStyle>
                  </Stack.Item>
                  <ReactSwitch
                    id="kindReminderPleaseAnswerClientsMessage"
                    onChange={onSwitchChange}
                    checked={formik.values.kindReminderPleaseAnswerClientsMessage}
                    handleDiameter={22}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#248ad3"
                    offColor="#C1C8D7"
                    disabled={false}
                  />
                </Stack>
              </div>
              <div className={styles.cardSection}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <TextStyle>Reminder: client is still waiting on your reply</TextStyle>
                  </Stack.Item>
                  <ReactSwitch
                    id="reminderClientIsStillWaitingOnYourReply"
                    onChange={onSwitchChange}
                    checked={formik.values.reminderClientIsStillWaitingOnYourReply}
                    handleDiameter={22}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#248ad3"
                    offColor="#C1C8D7"
                    disabled={false}
                  />
                </Stack>
              </div>
              <div className={styles.cardSection}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <TextStyle>Client sent urgent message - will set by default </TextStyle>
                  </Stack.Item>
                  <ReactSwitch
                    id="clientSentUrgentMessage"
                    onChange={onSwitchChange}
                    checked={formik.values.clientSentUrgentMessage}
                    handleDiameter={22}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#248ad3"
                    offColor="#C1C8D7"
                    disabled={false}
                  />
                </Stack>
              </div>
            </Card>
          </Layout.AnnotatedSection>

          <Layout.AnnotatedSection title="Promotion & tips">
            <Card sectioned>
              <div className={styles.cardSection}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <TextStyle>Tips with clients</TextStyle>
                  </Stack.Item>
                  <ReactSwitch
                    id="tipsWithClients"
                    onChange={onSwitchChange}
                    checked={formik.values.tipsWithClients}
                    handleDiameter={22}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#248ad3"
                    offColor="#C1C8D7"
                    disabled={false}
                  />
                </Stack>
              </div>
              <div className={styles.cardSection}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <TextStyle>Surveys</TextStyle>
                  </Stack.Item>
                  <ReactSwitch
                    id="surveys"
                    onChange={onSwitchChange}
                    checked={formik.values.surveys}
                    handleDiameter={22}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#248ad3"
                    offColor="#C1C8D7"
                    disabled={false}
                  />
                </Stack>
              </div>
              <div className={styles.cardSection}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <TextStyle>Product updates</TextStyle>
                  </Stack.Item>
                  <ReactSwitch
                    id="productUpdates"
                    onChange={onSwitchChange}
                    checked={formik.values.productUpdates}
                    handleDiameter={22}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#248ad3"
                    offColor="#C1C8D7"
                    disabled={false}
                  />
                </Stack>
              </div>
              <div className={styles.cardSection}>
                <Stack alignment="center">
                  <Stack.Item fill>
                    <TextStyle>Review left</TextStyle>
                  </Stack.Item>
                  <ReactSwitch
                    id="reviewLeft"
                    onChange={onSwitchChange}
                    checked={formik.values.reviewLeft}
                    handleDiameter={22}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#248ad3"
                    offColor="#C1C8D7"
                    disabled={false}
                  />
                </Stack>
              </div>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </div>
    </Page>
  );
};

export default Notifications;
