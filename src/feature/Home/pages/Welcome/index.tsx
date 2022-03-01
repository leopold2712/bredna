/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from 'react';
import { Layout, Page } from '@shopify/polaris';
import moment from 'moment';

import Dashboard from '../../../../shared/components/Dashboard';
import { useAppDispatch, useAppSelector } from '../../../../main/store/hooks';
import { getSlots } from '../../../../shared/store/actions/getSlots';
import { getSessions } from '../../../../shared/store/actions/getSessions';
import { getUser } from '../../../Onboarding/store';
import { StatusBanner } from '../../components/StatusBanner';
import { localStorageKeys } from '../../../../shared/constants/localStorage';
import { StateEntity } from '../../../../shared/models/StateEntity';

import type { SessionDTO } from '../../../../shared/dtos/session.dto';
import type { GetSlotsResponseDTO } from '../../../../shared/components/Dashboard/components/ScheduleView/dtos/getSlotResponse.dto';

import styles from './welcome.module.scss';
import './welcome.overload.scss';

const WelcomeHome = () => {
  const therapistInfo = useAppSelector(getUser);

  const [showBanner, setShowBanner] = useState(false);

  const [schedule, setSchedule] = useState<{
    list: GetSlotsResponseDTO[];
    loaded: boolean /* <<-- initial loading */;
    loading: boolean /* <<-- on dates change loading */;
    currentDate: Date;
    visible: boolean;
  }>({
    list: [],
    loaded: false,
    loading: false,
    currentDate: new Date(),
    visible: false,
  });

  const [sessions, setSessions] = useState<{
    list: SessionDTO[];
    loaded: boolean;
  }>({
    list: [],
    loaded: false,
  });

  const dispatch = useAppDispatch();

  const getInitialSchedule = async () => {
    const startTime = moment(moment().add(-30, 'day')).unix();
    const endTime = moment(moment().add(30, 'day')).unix();

    const { payload } = await dispatch(getSlots({ startTime, endTime }));

    const visible = (payload as GetSlotsResponseDTO[]).length > 0 || schedule.visible;

    setSchedule((prev) => ({
      ...prev,
      visible,
      list: payload as GetSlotsResponseDTO[],
      loaded: true,
      currentDate: prev.currentDate,
    }));
  };

  const getWeeklySchedule = async (date: Date) => {
    setSchedule((prev) => ({
      ...prev,
      loading: true,
    }));
    const startTime = moment(date).startOf('week').unix();
    const endTime = moment(date).endOf('week').unix();
    const { payload } = await dispatch(getSlots({ startTime, endTime }));

    setSchedule((prev) => ({
      ...prev,
      list: payload as GetSlotsResponseDTO[],
      loading: false,
      currentDate: moment.unix(endTime).toDate(),
    }));
  };

  const closeBanner = () => {
    localStorage.setItem(localStorageKeys.SHOW_THERAPIST_BANNER, 'false');
    setShowBanner(false);
  };

  const getInitialSessions = async () => {
    const startTime = moment().add(-30, 'day').unix();
    const endTime = moment().add(30, 'day').unix();

    const page = 1;
    const { payload } = await dispatch(getSessions({ startTime, endTime, page }));

    const nextSessions = (payload as StateEntity<SessionDTO>).list.filter(
      (item) => moment(item.start_time).unix() > moment().unix(),
    );

    setSessions((prev) => ({
      ...prev,
      list: nextSessions,
      loaded: true,
    }));
  };

  const checkBannerVisibility = () => {
    const flag = localStorage.getItem('showTherapistBanner');
    if (flag !== 'false') setShowBanner(true);
  };

  useEffect(() => {
    getInitialSchedule();
    getInitialSessions();

    checkBannerVisibility();
  }, []);

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <div className={styles.mainHeader}>
            <div className={styles.title}>
              <p className={styles.name}>
                {`Welcome ${therapistInfo ? therapistInfo.first_name || '' : ''}`}
              </p>
              <p className={styles.great}>Great to have you here with us</p>
            </div>
          </div>

          {showBanner && <StatusBanner status={therapistInfo.status} onDismiss={closeBanner} />}
        </Layout.Section>
      </Layout>

      <Dashboard
        schedule={{
          slotsList: schedule.list,
          loaded: schedule.loaded,
          loading: schedule.loading,
          currentScheduleDate: schedule.currentDate,
          updateSchedule: getWeeklySchedule,
          visible: schedule.visible,
        }}
        sessions={{
          sessionsList: sessions.list,
          loaded: sessions.loaded,
        }}
      />
    </Page>
  );
};

export default WelcomeHome;
