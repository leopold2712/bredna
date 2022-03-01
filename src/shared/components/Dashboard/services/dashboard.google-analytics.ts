import { AnalyticsEventObject, AnalyticsService } from '../../../services/analytics';

export enum GADashboardTriggers {
  SESSION_ALL,
  SESSION_LINK,
  SESSION_BOX,
  SCHEDULE_SET_NEW,
}

export const GADashboardEvents: { [key in GADashboardTriggers]: AnalyticsEventObject } = {
  [GADashboardTriggers.SESSION_ALL]: {
    category: 'homepage',
    action: 'session_all',
  },
  [GADashboardTriggers.SESSION_LINK]: {
    category: 'homepage',
    action: 'session_link',
  },
  [GADashboardTriggers.SESSION_BOX]: {
    category: 'homepage',
    action: 'session_box',
  },
  [GADashboardTriggers.SCHEDULE_SET_NEW]: {
    category: 'homepage',
    action: 'schedule_set_new',
  },
};

export const dashboardAnalyticsLog = (arg: GADashboardTriggers) => (): void =>
  AnalyticsService.track(GADashboardEvents[arg]);
