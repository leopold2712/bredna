import { EIterableFieldsKeys } from '../constants/sessions';

export type TSession = {
  show: number;
  noShow: number;
  total: number;
};

export type TSessionsData = {
  [EIterableFieldsKeys.Earnings]: TSession;
  [EIterableFieldsKeys.Count]: TSession;
  [EIterableFieldsKeys.Time]: TSession;
};

export type TTotal = {
  trialSessions: TSessionsData;
  liveSessions: TSessionsData;
  total: TSessionsData;
};
