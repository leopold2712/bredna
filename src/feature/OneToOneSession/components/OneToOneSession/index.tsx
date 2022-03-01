import React, { useEffect, useRef, useState } from 'react';
import FullCalendar, { EventClickArg, EventContentArg, EventInput } from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../main/store/hooks';
import { getMySchedule, getSessionState } from '../../store/selectors';
import { convertSchedule } from '../../utils/convertSchedule';
import { TimeRange, TimeRangeMoment } from '../../types/TimeRange.type';
import { isTimeRange } from '../../types/typeguards/isTimeRange.guard';
import { parseDateTime } from '../../utils/parseDateTime';
import {
  setSessionLoading,
  setViewMode,
  setSessionInfo,
  clearClientSessionInfo,
} from '../../store';
import {
  getClientNotices,
  getOneSlot,
  getSlots,
  getSessionNotes,
  deleteSession,
} from '../../store/actions';
import { SlotStatuses, defaultDefinition, SessionViewModes } from '../../constants';
import { SessionDTO, SlotFullInfoDTO } from '../../dtos';

import HeyToast from '../../../../shared/components/HeyToast';
import { MobileCalendar } from '../MobileCalendar';
import AvailabilityModal from '../AvailabilityModal';
import LiveSessionModal from '../LiveSessionModal';
import CancelSessionModal from '../CancelSessionModal';
import { useCustomWindowWidth } from '../../../../shared/hooks/useCustomWindowWidth';

import Plus from '../../../../assets/images/icons/plus.svg';

import styles from './styles.module.scss';
import './oneToOneSession.overload.scss';

type Props = {
  handlePrevWeek: () => void;
  handleNextWeek: () => void;
  currentDates: React.MutableRefObject<TimeRangeMoment>;
  getMonthSchedule: (date: Date) => void;
  /* we need to force rerender calendar after redirect from notification */
  shouldForceCalendarUpdate: boolean;
  setShouldForceCalendarUpdate: () => void;
};

const OneToOneSession: React.FC<Props> = ({
  handlePrevWeek,
  handleNextWeek,
  currentDates,
  getMonthSchedule,
  shouldForceCalendarUpdate,
  setShouldForceCalendarUpdate,
}: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const { mobileView } = useCustomWindowWidth();

  const calendarRef = useRef<FullCalendar>(null);

  const schedule = useAppSelector(getMySchedule);
  const { data } = useAppSelector(getSessionState);

  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([]);
  const [monthCount, setMonthCount] = useState(Number(moment().month()));
  const [yearCount, setYearCount] = useState(moment().year());
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false);
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [cancelModalIsOpen, setCancelModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchAndOpenSession = async (id: string | number) => {
    const { state } = location;

    setSessionModalOpen(true);

    if (id && state) {
      const sessionData: SlotFullInfoDTO = {
        id: '',
        definition_id: 0,
        start_time: (state as SessionDTO).start_time,
        end_time: (state as SessionDTO).end_time,
        status: SlotStatuses.BOOKED,
        definition: defaultDefinition,
        session: state as SessionDTO,
      };
      dispatch(setSessionInfo(sessionData));
      history.replace('/live-session');
    } else {
      // @ts-ignore
      const { payload } = await dispatch(getOneSlot(id));
      const sessionId = (payload as SlotFullInfoDTO).session.id;
      const clientId = (payload as SlotFullInfoDTO).session.participants[0].id;
      const clientOwnId = (payload as SlotFullInfoDTO).session.participants[0].client.id;

      await dispatch(getSessionNotes({ sessionId, clientId }));
      await dispatch(getClientNotices({ id: clientOwnId, page: 1 }));
    }
  };

  const handleCancelModalCancelClose = async () => {
    setCancelModalOpen(false);
  };

  const handleDeleteSession = async () => {
    setDeleteLoading(true);

    if (data?.session) {
      try {
        await dispatch(deleteSession(data.session.id));
        HeyToast.show({ text: 'Deleted successfully' });
        dispatch(
          getSlots({
            startTime: currentDates.current.start.unix(),
            endTime: currentDates.current.end.unix(),
          }),
        );
      } catch (err) {
        console.error(err);
        HeyToast.show({ text: 'An error occured while deleting the session', isError: true });
      }
      setDeleteLoading(false);
      setCancelModalOpen(false);
    } else {
      HeyToast.show({ text: 'An error occured while deleting the session', isError: true });
    }
  };

  const handleCancelModalCancelOpen = () => {
    setSessionModalOpen(false);
    setCancelModalOpen(true);
  };

  const handleSessionModalClose = () => {
    history.push('/live-session');
    setSessionModalOpen(false);
    dispatch(clearClientSessionInfo());
  };

  const handleClearTempSlot = () =>
    setCalendarEvents((prev) => prev.filter((e) => e.className !== 'temporarySlot'));

  const handleAvailabilityModalClose = () => {
    handleClearTempSlot();
    setSelectedEvent(null);
    setAvailabilityModalOpen(false);
  };

  const handleEventClick = async (clickInfo: EventClickArg) => {
    const slot = schedule.find((slot) => slot.id === clickInfo.event.id);
    const calendarEvent = calendarEvents.find((e) => e.id === clickInfo.event.id);
    if (calendarEvent !== undefined) setSelectedEvent(calendarEvent);

    if (slot && slot.status === SlotStatuses.VACANT) {
      dispatch(setViewMode(SessionViewModes.EDIT_SLOT));
      const { id } = slot;
      setAvailabilityModalOpen(true);
      await dispatch(getOneSlot(id));
      if (clickInfo.event.start) setSelectedDate(clickInfo.event.start);
    } else if (slot && slot.status === SlotStatuses.BOOKED) {
      dispatch(setViewMode(SessionViewModes.SESSION));
      const { id } = slot;
      fetchAndOpenSession(id);
    }
  };

  const handleDateClick = (arg: DateClickArg) => {
    setCalendarEvents([
      ...calendarEvents,
      {
        id: moment().unix().toString(),
        start: moment(arg.dateStr).toDate(),
        end: moment(arg.dateStr).add(30, 'minutes').toDate(),
        className: 'temporarySlot',
        textColor: '#c6cfe1',
        backgroundColor: '#c6cfe1',
        title: '',
      },
    ]);

    dispatch(setViewMode(SessionViewModes.NEW_SLOT));
    dispatch(setSessionLoading(false));
    setSelectedDate(arg.date);
    setAvailabilityModalOpen(true);
  };

  const handleMonthChange = (arg: Date) => getMonthSchedule(arg);

  const setDateToSlotsHeaders = () => {
    setTimeout(() => {
      const tableHeaders = document.getElementsByClassName('fc-col-header-cell');
      for (let i = tableHeaders.length - 1; i >= 0; i -= 1) {
        const dataDateAttr = tableHeaders[i].getAttribute('data-date');
        if (dataDateAttr != null) {
          const formattedDate = moment(dataDateAttr).format('D');
          tableHeaders[i]
            .getElementsByClassName('fc-scrollgrid-sync-inner')[0]
            .setAttribute('data-date', formattedDate);
        }
      }
    }, 500);
  };

  const setMonthToNavigation = () => {
    setTimeout(() => {
      const prevButton = document.getElementsByClassName(
        'fc-prev-button fc-button fc-button-primary',
      )[0];
      if (prevButton?.nextSibling?.nodeName === 'DIV') {
        // if we've already added date block
        prevButton?.nextSibling.remove();
      }

      const tableHeaders = document.getElementsByClassName('fc-col-header-cell');
      const dataDateAttr = tableHeaders[tableHeaders.length - 1]?.getAttribute('data-date');

      const dateBlock = document.createElement('div');
      dateBlock.innerText = moment(dataDateAttr || '').format('MMMM Y');
      dateBlock.style.display = 'flex';
      dateBlock.style.alignItems = 'center';
      dateBlock.style.justifyContent = 'center';
      dateBlock.style.padding = '5px';
      prevButton?.parentNode?.insertBefore(dateBlock, prevButton.nextSibling);
    }, 500);
  };

  useEffect(() => {
    setMonthToNavigation();
  }, [monthCount]);

  useEffect(() => {
    setDateToSlotsHeaders();
    setMonthToNavigation();
  }, [mobileView]);

  useEffect(() => {
    setCalendarEvents(convertSchedule(schedule));
  }, [schedule]);

  useEffect(() => {
    if (params.id) fetchAndOpenSession(params.id);
  }, [params]);

  const nextMonth = () => {
    let yearChange = false;
    setMonthCount((prev): number => {
      let returned = 1;
      if (prev < 11 && prev >= 0) {
        returned = prev + 1;
      } else {
        yearChange = true;
        returned = 0;
      }
      return returned;
    });
    if (yearChange) {
      setYearCount((prev) => prev + 1);
    }
    setDateToSlotsHeaders();
    setMonthToNavigation();
    handleNextWeek();
  };

  const prevMonth = () => {
    let yearChange = false;
    setMonthCount((prev): number => {
      let returned = 1;
      if (prev <= 11 && prev > 0) {
        returned = prev - 1;
      } else {
        yearChange = true;
        returned = 11;
      }
      return returned;
    });
    if (yearChange) {
      setYearCount((prev) => prev - 1);
    }
    setDateToSlotsHeaders();
    setMonthToNavigation();
    handlePrevWeek();
  };

  const checkAndScrollToEvent = () => {
    const calendar = calendarRef.current;
    let earliestEvent: EventInput | undefined;
    calendarEvents.forEach((e) => {
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

  useEffect(() => {
    document.querySelector('.fc-next-button')?.removeEventListener('click', nextMonth);
    document.querySelector('.fc-prev-button')?.removeEventListener('click', prevMonth);

    document.querySelector('.fc-next-button')?.addEventListener('click', nextMonth);
    document.querySelector('.fc-prev-button')?.addEventListener('click', prevMonth);
    return () => {
      document.querySelector('.fc-next-button')?.removeEventListener('click', nextMonth);
      document.querySelector('.fc-prev-button')?.removeEventListener('click', prevMonth);
    };
  }, [mobileView]);

  useEffect(() => {
    calendarRef.current?.getApi().gotoDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    // prevent scroll on the slot selection
    if (
      calendarEvents.length > 1 &&
      calendarEvents[calendarEvents.length - 1].className !== 'temporarySlot'
    )
      checkAndScrollToEvent();
  }, [currentDates, calendarEvents]);

  const renderEventContent = (eventContent: EventContentArg) => {
    const textArr = eventContent.timeText.split('-');
    if (textArr[0] && textArr[1]) {
      const text = `${textArr[0].slice(0, textArr[0].length - 3)}-${textArr[1].slice(1)}`;
      return (
        <div className="live-session__custom-event-view">
          <div className="time-container">
            <b>{text}</b>
          </div>
          <span className="fs-mask">
            <b>{eventContent.event.title}</b>
          </span>
        </div>
      );
    }
    return null;
  };

  const handleSlotsUpdate = () => {
    dispatch(
      getSlots({
        startTime: currentDates.current.start.unix(),
        endTime: currentDates.current.end.unix(),
      }),
    );
    setAvailabilityModalOpen(false);
  };

  const handleUpdateTempSlot = (arg: TimeRange | Date) => {
    let start = new Date();
    let end = new Date();
    if (isTimeRange(arg)) {
      if (moment(arg.start) < moment(arg.end)) {
        start = arg.start;
        end = arg.end;
      }
    } else {
      start = parseDateTime(arg, calendarEvents[calendarEvents.length - 1].start as Date);
      end = parseDateTime(arg, calendarEvents[calendarEvents.length - 1].end as Date);
    }

    const newSlot = {
      id: moment().unix().toString(),
      start,
      end,
      className: 'temporarySlot',
      textColor: '#c6cfe1',
      backgroundColor: '#c6cfe1',
      title: '',
    };
    setCalendarEvents([
      ...[...calendarEvents].filter((e) => e.className !== 'temporarySlot'),
      newSlot,
    ]);
  };

  useEffect(() => {
    if (shouldForceCalendarUpdate) {
      calendarRef.current?.getApi().gotoDate(currentDates.current.start.toDate());
      setDateToSlotsHeaders();
      setMonthToNavigation();
      setShouldForceCalendarUpdate();
    }
  }, [shouldForceCalendarUpdate]);

  return (
    <>
      {mobileView ? (
        <div>
          <MobileCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setSelectedMonth={handleMonthChange}
          />
          <h1 className={styles.dateHeader}>
            <span>{moment(selectedDate).format('ddd').toUpperCase()} </span>
            {moment(selectedDate).format('MMMM DD, YYYY')}
          </h1>
          <div className={styles.mobileCalendar}>
            <FullCalendar
              plugins={[timeGridPlugin, interactionPlugin]}
              headerToolbar={false}
              dayHeaders={false}
              events={calendarEvents}
              initialView="timeGridDay"
              initialDate={selectedDate}
              eventDisplay="block"
              dayHeaderFormat={{ weekday: 'short' }}
              selectMirror
              eventContent={renderEventContent}
              eventTimeFormat={{
                hour: 'numeric',
                minute: '2-digit',
                meridiem: 'short',
              }}
              eventClick={handleEventClick}
              allDaySlot={false}
              height="auto"
              dateClick={handleDateClick}
              ref={calendarRef}
              scrollTime="07:00:00"
              nowIndicator
            />

            <button
              type="button"
              className={styles.addSlotButton}
              onClick={() => setAvailabilityModalOpen(true)}
            >
              <img src={Plus} alt="plus" />
            </button>
          </div>
        </div>
      ) : (
        <div className="live-sessions__overload">
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next',
              right: '',
            }}
            events={calendarEvents}
            initialView="timeGridWeek"
            eventDisplay="block"
            dayHeaderFormat={{ weekday: 'short' }}
            selectMirror
            eventContent={renderEventContent}
            eventTimeFormat={{
              hour: 'numeric',
              minute: '2-digit',
              meridiem: 'short',
            }}
            eventClick={handleEventClick}
            allDaySlot={false}
            height="100%"
            dateClick={handleDateClick}
            ref={calendarRef}
            scrollTime="07:00:00"
            nowIndicator
          />
        </div>
      )}

      <AvailabilityModal
        isOpen={availabilityModalOpen}
        onSheetClose={handleAvailabilityModalClose}
        selectedDate={selectedDate}
        currentDates={currentDates}
        onSlotsUpdate={handleSlotsUpdate}
        updateTempSlot={handleUpdateTempSlot}
        eventInfo={selectedEvent}
      />
      <LiveSessionModal
        isOpen={sessionModalOpen}
        onClose={handleSessionModalClose}
        onEventCancel={handleCancelModalCancelOpen}
      />
      <CancelSessionModal
        isOpen={cancelModalIsOpen}
        onClose={handleCancelModalCancelClose}
        onDelete={handleDeleteSession}
        deleteLoading={deleteLoading}
      />
    </>
  );
};

export default OneToOneSession;
