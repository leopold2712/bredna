import { AnalyticsService } from '../../../shared/services/analytics';
import { GoogleAnalyticsEvents } from '../constants/GoogleAnalyticsEvents';
import {
  HomePageEvents,
  ProductEvents,
  ProfileEvents,
  ShareEvents,
  SettingsPageEvents,
} from '../constants/EventsTriggers';
import { TabSheets } from '../constants/TabSheet';

export const skipLogger = (activeScreen: TabSheets): void => {
  switch (activeScreen) {
    case TabSheets.completeProfile: {
      AnalyticsService.track(GoogleAnalyticsEvents.PROFILE.SKIP);
      break;
    }
    case TabSheets.completeProfessionalID: {
      AnalyticsService.track(GoogleAnalyticsEvents.CREATE_PRODUCT.SKIP);
      break;
    }
    default: {
      break;
    }
  }
};

export const saveLogger = (activeScreen: TabSheets): void => {
  switch (activeScreen) {
    case TabSheets.completeProfile: {
      AnalyticsService.track(GoogleAnalyticsEvents.PROFILE.SAVE);
      break;
    }
    case TabSheets.completeProfessionalID: {
      AnalyticsService.track(GoogleAnalyticsEvents.CREATE_PRODUCT.SAVE);
      break;
    }
    default: {
      break;
    }
  }
};

export const profileLogger = (action: ProfileEvents): void => {
  switch (action) {
    case ProfileEvents.TITLE: {
      AnalyticsService.track(GoogleAnalyticsEvents.PROFILE.TITLE);
      break;
    }
    case ProfileEvents.ABOUT: {
      AnalyticsService.track(GoogleAnalyticsEvents.PROFILE.ABOUT);
      break;
    }
    case ProfileEvents.PHOTO: {
      AnalyticsService.track(GoogleAnalyticsEvents.PROFILE.PHOTO);
      break;
    }
    default: {
      break;
    }
  }
};

export const productLogger = (action: ProductEvents, value?: string): void => {
  switch (action) {
    case ProductEvents.SWITCH_EVENT: {
      AnalyticsService.track(GoogleAnalyticsEvents.CREATE_PRODUCT.SWITCH.EVENT);
      break;
    }
    case ProductEvents.SWITCH_VOD: {
      AnalyticsService.track(GoogleAnalyticsEvents.CREATE_PRODUCT.SWITCH.VOD);
      break;
    }
    case ProductEvents.ADDITIONAL_INFORMATION: {
      AnalyticsService.track(GoogleAnalyticsEvents.CREATE_PRODUCT.ADDITIONAL_INFORMATION);
      break;
    }

    // -------------------------------------------------VOD EVENTS
    case ProductEvents.CURRENCY: {
      AnalyticsService.track({
        ...GoogleAnalyticsEvents.CREATE_PRODUCT.CURRENCY,
        label: `${GoogleAnalyticsEvents.CREATE_PRODUCT.CURRENCY.label}=${value}`,
      });
      break;
    }
    case ProductEvents.VOD_DESCRIPTION: {
      AnalyticsService.track(GoogleAnalyticsEvents.CREATE_PRODUCT.VOD.DESCRIPTION);
      break;
    }
    case ProductEvents.VOD_FILE: {
      AnalyticsService.track(GoogleAnalyticsEvents.CREATE_PRODUCT.VOD.FILE);
      break;
    }
    case ProductEvents.LANGUAGE: {
      AnalyticsService.track({
        ...GoogleAnalyticsEvents.CREATE_PRODUCT.LANGUAGE,
        label: `${GoogleAnalyticsEvents.CREATE_PRODUCT.LANGUAGE.label}=${value}`,
      });
      break;
    }
    case ProductEvents.PRICE: {
      AnalyticsService.track({
        ...GoogleAnalyticsEvents.CREATE_PRODUCT.PRICE,
        label: `${GoogleAnalyticsEvents.CREATE_PRODUCT.PRICE.label}=${value}`,
      });
      break;
    }
    case ProductEvents.VOD_THUMBNAIL: {
      AnalyticsService.track(GoogleAnalyticsEvents.CREATE_PRODUCT.VOD.THUMBNAIL);
      break;
    }
    case ProductEvents.VOD_TITLE: {
      AnalyticsService.track(GoogleAnalyticsEvents.CREATE_PRODUCT.VOD.TITLE);
      break;
    }
    // -------------------------------------------------END OF VOD EVENTS

    // -------------------------------------------------EVENT EVENTS
    case ProductEvents.EVENT_DATE: {
      AnalyticsService.track(GoogleAnalyticsEvents.CREATE_PRODUCT.EVENT.DATE);
      break;
    }
    case ProductEvents.EVENT_DESCRIPTION: {
      AnalyticsService.track(GoogleAnalyticsEvents.CREATE_PRODUCT.EVENT.DESCRIPTION);
      break;
    }
    case ProductEvents.EVENT_IMAGE: {
      AnalyticsService.track(GoogleAnalyticsEvents.CREATE_PRODUCT.EVENT.IMAGE);
      break;
    }
    case ProductEvents.EVENT_LINK: {
      AnalyticsService.track(GoogleAnalyticsEvents.CREATE_PRODUCT.EVENT.LINK);
      break;
    }
    case ProductEvents.EVENT_TIME: {
      AnalyticsService.track(GoogleAnalyticsEvents.CREATE_PRODUCT.EVENT.TIME);
      break;
    }
    case ProductEvents.EVENT_TITLE: {
      AnalyticsService.track(GoogleAnalyticsEvents.CREATE_PRODUCT.EVENT.TITLE);
      break;
    }
    // -------------------------------------------------END OF EVENT EVENTS
    default: {
      break;
    }
  }
};

export const shareLogger = (action: ShareEvents): void => {
  switch (action) {
    case ShareEvents.COPY_LINK: {
      AnalyticsService.track(GoogleAnalyticsEvents.SHARE_PROFILE.COPY_LINK);
      break;
    }
    case ShareEvents.EXPERT_PAGE: {
      AnalyticsService.track(GoogleAnalyticsEvents.SHARE_PROFILE.EXPERT_PAGE);
      break;
    }
    case ShareEvents.FURTHER_INFO: {
      AnalyticsService.track(GoogleAnalyticsEvents.SHARE_PROFILE.FURTHER_INFO);
      break;
    }
    default: {
      break;
    }
  }
};

export const homePageLogger = (action: HomePageEvents): void => {
  switch (action) {
    case HomePageEvents.MY_EXPERT_PAGE: {
      AnalyticsService.track(GoogleAnalyticsEvents.HOME_PAGE.MY_EXPERT_PAGE);
      break;
    }
    case HomePageEvents.EXPECTED_EARNINGS_DASHBOARD: {
      AnalyticsService.track(GoogleAnalyticsEvents.HOME_PAGE.YOUR_DASHBOARD_EXPECTED_EARNING);
      break;
    }
    case HomePageEvents.CLIENT_OVERVIEW_DASHBOARD: {
      AnalyticsService.track(GoogleAnalyticsEvents.HOME_PAGE.YOUR_DASHBOARD_CLIENT_EARNING);
      break;
    }
    case HomePageEvents.WEEKLY_ORDERS_DASHBOARD: {
      AnalyticsService.track(GoogleAnalyticsEvents.HOME_PAGE.YOUR_DASHBOARD_WEEKLY_ORDERS);
      break;
    }
    case HomePageEvents.FEATURES_HUB: {
      AnalyticsService.track(GoogleAnalyticsEvents.HOME_PAGE.FEATURES_HUB);
      break;
    }
    case HomePageEvents.FEATURES_EVENTS: {
      AnalyticsService.track(GoogleAnalyticsEvents.HOME_PAGE.FEATURES_EVENT);
      break;
    }
    case HomePageEvents.FEATURE_ORDERS: {
      AnalyticsService.track(GoogleAnalyticsEvents.HOME_PAGE.FEATURES_ORDERS);
      break;
    }
    case HomePageEvents.FEATURE_CLIENTS: {
      AnalyticsService.track(GoogleAnalyticsEvents.HOME_PAGE.FEATURES_CLIENTS);
      break;
    }
    case HomePageEvents.FEATURE_BILLING_ACCOUNT: {
      AnalyticsService.track(GoogleAnalyticsEvents.HOME_PAGE.FEATURES_BILLING_ACCOUNT);
      break;
    }
    case HomePageEvents.FEATURE_VOD: {
      AnalyticsService.track(GoogleAnalyticsEvents.HOME_PAGE.FEATURES_VOD);
      break;
    }
    default:
      break;
  }
};

export const settingsPageLogger = (action: SettingsPageEvents): void => {
  switch (action) {
    case SettingsPageEvents.MY_PROFILE: {
      AnalyticsService.track(GoogleAnalyticsEvents.SETTINGS.MY_PROFILE);
      break;
    }
    case SettingsPageEvents.LEGAL: {
      AnalyticsService.track(GoogleAnalyticsEvents.SETTINGS.LEGAL);
      break;
    }
    case SettingsPageEvents.PAYMENTS: {
      AnalyticsService.track(GoogleAnalyticsEvents.SETTINGS.PAYMENTS);
      break;
    }
    case SettingsPageEvents.MEDIA_LIBRARY: {
      AnalyticsService.track(GoogleAnalyticsEvents.SETTINGS.MEDIA_LIBRARY);
      break;
    }
    case SettingsPageEvents.NOTIFICATION: {
      AnalyticsService.track(GoogleAnalyticsEvents.SETTINGS.NOTIFICATION);
      break;
    }
    default: {
      break;
    }
  }
};
