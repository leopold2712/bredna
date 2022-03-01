import { AnalyticsEventObject, AnalyticsService } from '../../../services/analytics';

export enum GASidemenuTriggers {
  MENU_HOME,
  MENU_CLIENTS,
  MENU_MESSAGING,
  MENU_LIVE_SESSION,
  MENU_MY_PROFILE,
  MENU_EARNING,
  MENU_ANALYTICS,
  MENU_SETTINGS,
}

export const GASidemenuEvents: { [key in GASidemenuTriggers]: AnalyticsEventObject } = {
  [GASidemenuTriggers.MENU_HOME]: {
    category: 'menu',
    action: '/home',
    label: 'menu_home',
  },
  [GASidemenuTriggers.MENU_CLIENTS]: {
    category: 'menu',
    action: '/clients',
    label: 'menu_clients',
  },
  [GASidemenuTriggers.MENU_MESSAGING]: {
    category: 'menu',
    action: '/messaging',
    label: 'menu_messaging',
  },
  [GASidemenuTriggers.MENU_LIVE_SESSION]: {
    category: 'menu',
    action: '/live_session',
    label: 'menu_live_session',
  },
  [GASidemenuTriggers.MENU_MY_PROFILE]: {
    category: 'menu',
    action: '/my_profile',
    label: 'menu_my_profile',
  },
  [GASidemenuTriggers.MENU_EARNING]: {
    category: 'menu',
    action: '/earning',
    label: 'menu_earning',
  },
  [GASidemenuTriggers.MENU_ANALYTICS]: {
    category: 'menu',
    action: '/analytics',
    label: 'menu_analytics',
  },
  [GASidemenuTriggers.MENU_SETTINGS]: {
    category: 'menu',
    action: '/settings',
    label: 'menu_settings',
  },
};

export const sidemenuAnalyticsLog = (arg: GASidemenuTriggers) => (): void => {
  AnalyticsService.track(GASidemenuEvents[arg]);
};
