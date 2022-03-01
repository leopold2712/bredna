import { AnalyticsEventObject, AnalyticsService } from '../../../shared/services/analytics';

export enum GAForgotPasswordTriggers {
  FORGOT_PASSWORD_INPUT,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_RETURN,
  FORGOT_PASSWORD_CTA,
}

export const GAForgotPasswordEvents: { [key in GAForgotPasswordTriggers]: AnalyticsEventObject } = {
  [GAForgotPasswordTriggers.FORGOT_PASSWORD_INPUT]: {
    category: 'forgot_password',
    action: 'forgot_password_input',
  },
  [GAForgotPasswordTriggers.FORGOT_PASSWORD_ERROR]: {
    category: 'forgot_password',
    action: 'forgot_password_error',
  },
  [GAForgotPasswordTriggers.FORGOT_PASSWORD_RETURN]: {
    category: 'forgot-password',
    action: 'forgot_password_return',
  },
  [GAForgotPasswordTriggers.FORGOT_PASSWORD_CTA]: {
    category: 'forgot-password',
    action: 'forgot_password_cta',
  },
};

export const forgotAnalyticsLog = (arg: GAForgotPasswordTriggers) => (): void => {
  AnalyticsService.track(GAForgotPasswordEvents[arg]);
};
