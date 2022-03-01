import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, Icon } from '@shopify/polaris';
import { ChevronLeftMinor, ChevronRightMinor } from '@shopify/polaris-icons';
import FullCalendar, { EventInput } from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { ScheduleLegend } from '../ScheduleLegend';
import { convertSchedule } from './utils/convertSchedule';
import { useAppSelector } from '../../../../../main/store/hooks';
import { LocalLoader } from '../../../LocalLoader';
import { SlotDTO } from '../../../../dtos/slot.dto';
import { SlotStatuses } from '../../../../constants/slotStatuses';
import { colors } from './constants/colors';
import { GetSlotsResponseDTO } from './dtos/getSlotResponse.dto';
import {
  dashboardAnalyticsLog,
  GADashboardTriggers,
} from '../../services/dashboard.google-analytics';

import styles from './scheduleView.module.scss';
import './styles.overload.scss';

type Props = {
  list: GetSlotsResponseDTO[];
  loading: boolean;
  updateSchedule: (date: Date) => void;
  currentDate: Date;
  visible: boolean;
};

type DaysWithSession = { [day: string]: number };

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ScheduleViewMemo: React.FC<Props> = ({
  list,
  loading,
  currentDate,
  updateSchedule,
  visible,
}: Props): JSX.Element => {
  const calendarRef = useRef<FullCalendar>(null);
  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([]);

  const history = useHistory();

  const month = moment(currentDate).month();
  const year = moment(currentDate).year();

  const timezoneName = useAppSelector((state) => state.auth?.user?.time_zone?.name);

  const checkAndScrollToEvent = () => {
    const calendar = calendarRef.current;
    let earliestEvent: EventInput | undefined;

    const start = moment(currentDate).startOf('week');
    const end = moment(currentDate).endOf('week');

    const filteredEvents = calendarEvents.filter(
      (e) => moment(e.start).isSameOrAfter(start) && moment(e.end).isSameOrBefore(end),
    );

    filteredEvents.forEach((e) => {
      if (!earliestEvent) earliestEvent = e;
      else if (
        moment(e.start).format('HH:mm:ss') <= moment(earliestEvent?.start).format('HH:mm:ss')
      ) {
        earliestEvent = e;
      }
    });

    if (calendarRef.current) {
      const api = calendar?.getApi();
      if (earliestEvent) {
        const scrollTime =
          moment(earliestEvent.start).hours() > 0
            ? moment(earliestEvent.start).add(-1, 'h').format('HH:mm')
            : moment(earliestEvent.start).format('HH:mm');

        api?.scrollToTime(scrollTime);
      } else {
        api?.scrollToTime('07:00');
      }
    }
  };

  const handleCalendarWeek = (arg: 'prev' | 'next') => {
    const calendar = calendarRef.current;
    if (calendar) {
      const api = calendar.getApi();
      switch (arg) {
        case 'prev': {
          api.prev();
          break;
        }
        case 'next': {
          api.next();
          break;
        }
        default:
          break;
      }
      const date = api.getDate();

      updateSchedule(date);
    }
  };

  useEffect(() => {
    checkAndScrollToEvent();
  }, [currentDate, calendarEvents]);

  const navigateToLiveSession = () => {
    dashboardAnalyticsLog(GADashboardTriggers.SCHEDULE_SET_NEW)();
    history.push('/live-session');
  };

  const addTimeLabel = () => {
    const td = document.querySelector('th.fc-timegrid-axis');
    if (td) {
      const p = document.createElement('p');
      p.innerText = 'Time';
      p.className = 'calendar__time-header';
      td.appendChild(p);
    }
  };

  const removeTimeLabel = () => {
    const td = document.querySelector('th.fc-timegrid-axis');
    const p = document.querySelector('th.fc-timegrid-axis p.calendar__time-header');
    if (p) td?.removeChild(p);
  };

  useEffect(() => {
    addTimeLabel();

    return () => removeTimeLabel();
  }, []);

  useEffect(() => {
    const allSlots: SlotDTO[] = [];
    const daysWithSessions = {};
    list.forEach((day) => {
      day.slots?.forEach((slot) => {
        allSlots.push(slot);
        if (slot.status === SlotStatuses.BOOKED) {
          if ((daysWithSessions as DaysWithSession)[moment(slot.start_time).format('DD.MM.YYYY')]) {
            (daysWithSessions as DaysWithSession)[
              moment(slot.start_time).format('DD.MM.YYYY')
            ] += 1;
          } else {
            (daysWithSessions as DaysWithSession)[moment(slot.start_time).format('DD.MM.YYYY')] = 1;
          }
        }
      });
    });
    setCalendarEvents(convertSchedule(allSlots, colors));
  }, [list]);

  const renderEventContent = () => <div className={styles.customEvent} />;

  const renderDayHeader = (arg: { date: Date }) => (
    <div
      className={`${styles.customHeader} ${
        moment(arg.date).format('YYYY.MM.DD') === moment().format('YYYY.MM.DD')
          ? styles.todayCell
          : ''
      }
      ${
        moment(arg.date).format('YYYY.MM.DD') < moment().format('YYYY.MM.DD') ? styles.pastCell : ''
      }`}
    >
      <p>{moment(arg.date).format('dd')}</p>
      <p>{moment(arg.date).format('DD')}</p>
    </div>
  );

  return (
    <Card>
      {visible ? (
        <div className={styles.container}>
          <div className={styles.controlBar}>
            <div className={styles.row}>
              <div className={styles.selectMonth}>
                <button type="button" onClick={() => handleCalendarWeek('prev')}>
                  <Icon source={ChevronLeftMinor} />
                </button>
                <button type="button" onClick={() => handleCalendarWeek('next')}>
                  <Icon source={ChevronRightMinor} />
                </button>
                <p>{`${months[month]} ${year}`}</p>
              </div>
              <Button primary onClick={navigateToLiveSession}>
                Set new
              </Button>
            </div>
            <div className={styles.row}>
              <ScheduleLegend />
            </div>
          </div>
          <div className="homepage__calendar-overload">
            <FullCalendar
              allDaySlot={false}
              events={calendarEvents}
              eventContent={renderEventContent}
              height="100%"
              scrollTime="07:00:00"
              headerToolbar={false}
              initialView="timeGridWeek"
              plugins={[timeGridPlugin, interactionPlugin]}
              ref={calendarRef}
              slotDuration="01:00:00"
              dayHeaderContent={renderDayHeader}
              nowIndicator
            />

            {loading && <LocalLoader />}
          </div>
          <div className={styles.footer}>
            {`Based on your timezone UTC${moment()
              .tz(timezoneName || Intl.DateTimeFormat().resolvedOptions().timeZone)
              .format('Z')} (${timezoneName || Intl.DateTimeFormat().resolvedOptions().timeZone})`}
          </div>
        </div>
      ) : (
        <Card.Section>
          <div className={styles.rightBlock}>
            <div className={styles.blockInfo}>
              <span className={styles.blockTitle}>
                In order to start your work on Brenda you should set up your availability
              </span>
            </div>
            <div className={styles.blockBtnCnt}>
              <div className={styles.blockBtn}>
                <Button fullWidth primary onClick={navigateToLiveSession}>
                  Set availability
                </Button>
              </div>
            </div>
          </div>
        </Card.Section>
      )}
    </Card>
  );
};

export const ScheduleView = React.memo(ScheduleViewMemo);
