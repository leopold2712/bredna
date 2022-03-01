import { AnalyticsEventObject, AnalyticsService } from '../../../shared/services/analytics';

export type PossibleLoginErrors = {
  password?: string;
  email?: string;
};

export enum GALoginTriggers {
  LOGIN_EMAIL_INPUT,
  LOGIN_EMAIL_ERROR,
  LOGIN_PASSWORD_INPUT,
  LOGIN_PASSWORD_ERROR,
  LOGIN_CTA,
  LOGIN_SIGNUP,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FORGOT_PASSWORD,
}

export const GALoginEvents: { [key in GALoginTriggers]: AnalyticsEventObject } = {
  [GALoginTriggers.LOGIN_EMAIL_INPUT]: {
    category: 'login',
    action: 'login_email_input',
  },
  [GALoginTriggers.LOGIN_EMAIL_ERROR]: {
    category: 'login',
    action: 'login_email_error',
  },
  [GALoginTriggers.LOGIN_PASSWORD_INPUT]: {
    category: 'login',
    action: 'login_password_input',
  },
  [GALoginTriggers.LOGIN_PASSWORD_ERROR]: {
    category: 'login',
    action: 'login_password_error',
  },
  [GALoginTriggers.LOGIN_CTA]: {
    category: 'login',
    action: 'login_cta',
  },
  [GALoginTriggers.LOGIN_SIGNUP]: {
    category: 'login',
    action: 'login_signup',
  },
  [GALoginTriggers.LOGIN_ERROR]: {
    category: 'login',
    action: 'login_error',
  },
  [GALoginTriggers.LOGIN_SUCCESS]: {
    category: 'login',
    action: 'login_success',
  },
  [GALoginTriggers.LOGIN_FORGOT_PASSWORD]: {
    category: 'login',
    action: 'login_forgot_password',
  },
};

export const loginAnalyticsLog = (arg: GALoginTriggers) => (): void => {
  AnalyticsService.track(GALoginEvents[arg]);
};

export const loginErrorLog = (arg: PossibleLoginErrors): void => {
  if (arg.email !== undefined) loginAnalyticsLog(GALoginTriggers.LOGIN_EMAIL_ERROR)();
  if (arg.password !== undefined) loginAnalyticsLog(GALoginTriggers.LOGIN_PASSWORD_ERROR)();
};
