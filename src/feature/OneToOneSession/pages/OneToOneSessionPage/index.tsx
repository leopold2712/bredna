import React, { useEffect, useRef, useState } from 'react';
import { ButtonGroup, Page } from '@shopify/polaris';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../main/store/hooks';

import { getSlots } from '../../store/actions';
import { getNestedFields } from '../../../../shared/utils';
import { getMySchedule } from '../../store/selectors';

import { TimeRangeMoment } from '../../types/TimeRange.type';
import { SessionDTO, SlotDTO } from '../../dtos';

import OneToOneSession from '../../components/OneToOneSession';
import CSVButtonCustomize from '../../../../shared/components/CSVButtonCustomize';

import './oneToOneSession.overload.scss';

const OneToOneSessionPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const dateRange = useRef<TimeRangeMoment>({
    start: moment().startOf('week').startOf('day'),
    end: moment().endOf('week').endOf('day'),
  });

  const slots = useAppSelector(getMySchedule);

  const [shouldForceCalendarUpdate, setShouldForceCalendarUpdate] = useState(false);

  const initialLoading = async () => {
    const state = location.state || {};

    if (Object.keys(state as SessionDTO).length > 0) {
      dateRange.current = {
        start: moment((state as SessionDTO).start_time).startOf('week'),
        end: moment((state as SessionDTO).start_time).endOf('week'),
      };
      location.state = {};
    }
    const { start, end } = dateRange.current;
    await dispatch(getSlots({ startTime: moment(start).unix(), endTime: moment(end).unix() }));

    if (Object.keys(state as SessionDTO).length > 0) setShouldForceCalendarUpdate(true);
  };

  const setCalendarUpdated = () => setShouldForceCalendarUpdate(false);

  const handleNextWeek = async () => {
    const { end } = dateRange.current;
    const startTime = moment(end).add(1, 'day').startOf('day');
    const endTime = moment(end).add(1, 'week').endOf('day');

    dateRange.current = { start: startTime, end: endTime };

    await dispatch(
      getSlots({ startTime: moment(startTime).unix(), endTime: moment(endTime).unix() }),
    );
  };

  const handlePrevWeek = async () => {
    const { start } = dateRange.current;
    const startTime = moment(start).add(-1, 'week').startOf('day');
    const endTime = moment(start).add(-1, 'day').endOf('day');

    dateRange.current = { start: startTime, end: endTime };

    await dispatch(
      getSlots({ startTime: moment(startTime).unix(), endTime: moment(endTime).unix() }),
    );
  };

  const getMonthSchedule = (date: Date) => {
    const start = moment(date).startOf('month');
    const end = moment(date).endOf('month');
    dispatch(getSlots({ startTime: moment(start).unix(), endTime: moment(end).unix() }));
  };

  useEffect(() => {
    initialLoading();
  }, []);

  useEffect(() => {
    if (location.state) initialLoading();
  }, [location.state]);

  const onExport = () => ({ payload: slots });

  return (
    <Page
      title="Live Session"
      subtitle="Set available time frame for 1:1"
      fullWidth
      primaryAction={
        <ButtonGroup>
          <CSVButtonCustomize
            fileName="sessions"
            title="Sessions"
            hideIcon
            getData={onExport}
            transformData={(item: SlotDTO) => {
              const transformedItem = getNestedFields({
                SlotID: item.id,
                DefinitionID: item.definition_id,
                'Start Time': moment(item.start_time).format('DD.MM.YYYY'),
                'End Time': moment(item.end_time).format('DD.MM.YYYY'),
                Status: item.status,
              });
              return transformedItem;
            }}
          />
        </ButtonGroup>
      }
    >
      <div className="liveSessionContainer" id="sessionsContainer">
        <OneToOneSession
          handleNextWeek={handleNextWeek}
          handlePrevWeek={handlePrevWeek}
          currentDates={dateRange}
          getMonthSchedule={getMonthSchedule}
          shouldForceCalendarUpdate={shouldForceCalendarUpdate}
          setShouldForceCalendarUpdate={setCalendarUpdated}
        />
      </div>
    </Page>
  );
};

export default OneToOneSessionPage;
