import { AnalyticsEventObject, AnalyticsService } from '../../../shared/services/analytics';

export type PossibleSignupErrors = {
  confirmPassword?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  termsAccepted?: string;
};

export enum GASignupTriggers {
  SIGNUP_EMAIL_INPUT,
  SIGNUP_EMAIL_ERROR,
  SIGNUP_FIRST_NAME_INPUT,
  SIGNUP_FIRST_NAME_ERROR,
  SIGNUP_LAST_NAME_INPUT,
  SIGNUP_LAST_NAME_ERROR,
  SIGNUP_PASSWORD_INPUT,
  SIGNUP_PASSWORD_ERROR,
  SIGNUP_TOU_CHECKED,
  SIGNUP_TOU_ERROR,
  SIGNUP_TERMS_OF_USE,
  SIGNUP_CTA,
  SIGNUP_LOGIN,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
}

export const GASignupEvents: { [key in GASignupTriggers]: AnalyticsEventObject } = {
  [GASignupTriggers.SIGNUP_EMAIL_INPUT]: {
    category: 'signup',
    action: 'signup_email_input',
  },
  [GASignupTriggers.SIGNUP_EMAIL_ERROR]: {
    category: 'signup',
    action: 'signup_email_error',
  },
  [GASignupTriggers.SIGNUP_FIRST_NAME_INPUT]: {
    category: 'signup',
    action: 'signup_first_name_input',
  },
  [GASignupTriggers.SIGNUP_FIRST_NAME_ERROR]: {
    category: 'signup',
    action: 'signup_first_name_error',
  },
  [GASignupTriggers.SIGNUP_LAST_NAME_INPUT]: {
    category: 'signup',
    action: 'signup_last_name_input',
  },
  [GASignupTriggers.SIGNUP_LAST_NAME_ERROR]: {
    category: 'signup',
    action: 'signup_last_name_error',
  },
  [GASignupTriggers.SIGNUP_PASSWORD_INPUT]: {
    category: 'signup',
    action: 'signup_password_input',
  },
  [GASignupTriggers.SIGNUP_PASSWORD_ERROR]: {
    category: 'signup',
    action: 'signup_password_error',
  },
  [GASignupTriggers.SIGNUP_TOU_CHECKED]: {
    category: 'signup',
    action: 'signup_tou_checked',
  },
  [GASignupTriggers.SIGNUP_TOU_ERROR]: {
    category: 'signup',
    action: 'signup_tou_error',
  },
  [GASignupTriggers.SIGNUP_TERMS_OF_USE]: {
    category: 'signup',
    action: 'signup_terms_of_use',
  },
  [GASignupTriggers.SIGNUP_CTA]: {
    category: 'signup',
    action: 'signup_cta',
  },
  [GASignupTriggers.SIGNUP_LOGIN]: {
    category: 'signup',
    action: 'signup_login',
  },
  [GASignupTriggers.SIGNUP_ERROR]: {
    category: 'signup',
    action: 'signup_error',
  },
  [GASignupTriggers.SIGNUP_SUCCESS]: {
    category: 'signup',
    action: 'signup_success',
  },
};

export const signupAnalyticsLog = (arg: GASignupTriggers) => (): void => {
  AnalyticsService.track(GASignupEvents[arg]);
};

export const signupErrorLog = (arg: PossibleSignupErrors): void => {
  if (arg.email !== undefined) signupAnalyticsLog(GASignupTriggers.SIGNUP_EMAIL_ERROR)();
  if (arg.first_name !== undefined) signupAnalyticsLog(GASignupTriggers.SIGNUP_FIRST_NAME_ERROR)();
  if (arg.last_name !== undefined) signupAnalyticsLog(GASignupTriggers.SIGNUP_LAST_NAME_ERROR)();
  if (arg.confirmPassword !== undefined)
    signupAnalyticsLog(GASignupTriggers.SIGNUP_PASSWORD_ERROR)();
  if (arg.termsAccepted !== undefined) signupAnalyticsLog(GASignupTriggers.SIGNUP_TOU_ERROR)();
};
