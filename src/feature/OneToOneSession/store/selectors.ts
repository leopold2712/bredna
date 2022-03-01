import { SessionViewModes } from '../constants';

import type { RootState } from '../../../main/store/rootReducer';
import type { NoticeDTO, JourneyDTO } from '../../../shared/dtos';
import type { StateEntity } from '../../../shared/models/StateEntity';
import type { SlotDTO, SlotFullInfoDTO } from '../dtos';

export const getMySchedule = (state: RootState): SlotDTO[] => state.liveSession.currentSchedule;
export const getSessionState = (
  state: RootState,
): {
  data: SlotFullInfoDTO | null;
  loading: boolean;
} => ({
  data: state.liveSession.session,
  loading: state.liveSession.sessionLoading,
});

export const getCurrentSlot = (
  state: RootState,
): {
  data: SlotFullInfoDTO | null;
  loading: boolean;
  viewMode: SessionViewModes;
} => ({
  data: state.liveSession.currentSlot,
  loading: state.liveSession.sessionLoading,
  viewMode: state.liveSession.viewMode,
});

export const selectCurrentSlot = (state: RootState): SlotFullInfoDTO | null =>
  state.liveSession.currentSlot;

export const getDaysWithSessions = (state: RootState): { [name: string]: number } =>
  state.liveSession.daysWithSessions;

export const selectSessionNotes = (state: RootState): JourneyDTO => state.liveSession.journey;

export const selectClientNotices = (state: RootState): StateEntity<NoticeDTO> =>
  state.liveSession.clientNotices;
