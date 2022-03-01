import { AnalyticsEventObject, AnalyticsService } from '../../../services/analytics';

export enum GAHeaderTriggers {
  LOGO,
  USER_ACCOUNT,
  USER_LOG_OUT,
  USER_PARTNER_SUPPORT,
  NOTIFICATION_ICON,
}

export const GAHeaderEvents: { [key in GAHeaderTriggers]: AnalyticsEventObject } = {
  [GAHeaderTriggers.LOGO]: {
    category: 'header',
    action: 'logo',
  },
  [GAHeaderTriggers.USER_ACCOUNT]: {
    category: 'header',
    action: 'user_account',
  },
  [GAHeaderTriggers.USER_LOG_OUT]: {
    category: 'header',
    action: 'user_log_out',
  },
  [GAHeaderTriggers.USER_PARTNER_SUPPORT]: {
    category: 'header',
    action: 'user_partner_support',
  },
  [GAHeaderTriggers.NOTIFICATION_ICON]: {
    category: 'header',
    action: 'notification_icon',
  },
};

export const headerAnalyticsLog = (arg: GAHeaderTriggers) => (): void => {
  AnalyticsService.track(GAHeaderEvents[arg]);
};
