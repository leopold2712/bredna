import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import type { SlotDTO, SlotFullInfoDTO } from '../dtos';
import type { NoticeDTO } from '../../../shared/dtos';
import type { JourneyDTO } from '../../../shared/dtos/journey.dto';
import { StateEntity } from '../../../shared/models/StateEntity';
import { SlotStatuses } from '../constants/slotStatuses';
import { getClientNotices, getOneSlot, getSlots } from './actions';
import { getSessionNotes } from './actions/getSessionNotes';
import { addNote } from './actions/addNote';
import { patchNote } from './actions/patchNote';
import { initialJourney, initialNotices, SessionViewModes } from '../constants';

type DaysWithSession = { [day: string]: number };

export type LiveSessionState = {
  currentSchedule: SlotDTO[];
  session: SlotFullInfoDTO | null;
  sessionLoading: boolean;
  viewMode: SessionViewModes;
  currentSlot: SlotFullInfoDTO | null;
  daysWithSessions: DaysWithSession;
  journey: JourneyDTO;
  clientNotices: StateEntity<NoticeDTO>;
};

const initialState: LiveSessionState = {
  currentSchedule: [],
  session: null,
  sessionLoading: true,
  currentSlot: null,
  viewMode: SessionViewModes.NEW_SLOT,
  daysWithSessions: {},
  journey: initialJourney,
  clientNotices: initialNotices,
};

const liveSessionSlice = createSlice({
  name: 'live-session',
  initialState,
  reducers: {
    clearSession: (state) => {
      state.session = null;
      state.currentSlot = null;
      state.sessionLoading = true;
    },
    setSessionInfo: (state, action: PayloadAction<SlotFullInfoDTO>) => {
      state.session = action.payload;
      state.sessionLoading = false;
    },
    setSessionLoading: (state: LiveSessionState, action: PayloadAction<boolean>) => {
      state.sessionLoading = action.payload;
    },
    setCurrentSlot: (state: LiveSessionState, action: PayloadAction<SlotFullInfoDTO | null>) => {
      state.currentSlot = action.payload;
    },
    setViewMode: (state: LiveSessionState, action: PayloadAction<SessionViewModes>) => {
      state.viewMode = action.payload;
    },
    clearClientSessionInfo: (state: LiveSessionState) => {
      state.clientNotices = initialNotices;
      state.journey = initialJourney;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSlots.fulfilled, (state, { payload }) => {
      const daysWithSessions = {};
      const allSlots: SlotDTO[] = [];
      payload?.forEach((day) => {
        day.slots?.forEach((slot) => {
          allSlots.push(slot);
          if (slot.status === SlotStatuses.BOOKED) {
            if (
              (daysWithSessions as DaysWithSession)[moment(slot.start_time).format('DD.MM.YYYY')]
            ) {
              (daysWithSessions as DaysWithSession)[
                moment(slot.start_time).format('DD.MM.YYYY')
              ] += 1;
            } else {
              (daysWithSessions as DaysWithSession)[
                moment(slot.start_time).format('DD.MM.YYYY')
              ] = 1;
            }
          }
        });
      });

      state.currentSchedule = allSlots;
      state.daysWithSessions = daysWithSessions;
    });
    builder.addCase(getOneSlot.pending, (state) => {
      state.sessionLoading = true;
    });
    builder.addCase(getOneSlot.rejected, (state) => {
      state.session = null;
      state.sessionLoading = false;
    });
    builder.addCase(getOneSlot.fulfilled, (state, { payload }) => {
      if (payload.status === SlotStatuses.VACANT) state.currentSlot = payload;
      else state.session = payload;
      state.sessionLoading = false;
    });
    builder.addCase(getSessionNotes.fulfilled, (state, { payload }) => {
      state.journey = payload;
    });
    builder.addCase(addNote.fulfilled, (state, { payload }) => {
      state.journey = payload;
    });
    builder.addCase(patchNote.fulfilled, (state, { payload }) => {
      state.journey = payload;
    });
    builder.addCase(getClientNotices.fulfilled, (state, { payload }) => {
      state.clientNotices = payload;
    });
  },
});

export const {
  clearSession,
  setSessionLoading,
  setCurrentSlot,
  setSessionInfo,
  setViewMode,
  clearClientSessionInfo,
} = liveSessionSlice.actions;

export default liveSessionSlice.reducer;
