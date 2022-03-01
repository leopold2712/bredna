import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../../feature/Onboarding/store';
import headerReducer from '../../shared/components/Header/store';
import metaReducer from '../../shared/store/meta';
import customersReducer from '../../feature/Customers/store';
import analyticsReducer from '../../feature/Analytics/store';
import notificationsReducer from '../../shared/components/Notifications/store';
import myProfileReducer from '../../feature/MyProfile/store';
import loadingReducer from '../../shared/store/loading';
import errorReducer from '../../shared/store/error';
import homeReducer from '../../feature/Home/store';
import dashboardReducer from '../../shared/components/Dashboard/store';
import sideMenuReducer from '../../shared/components/SideMenu/store';
import chatReducer from '../../feature/Conversations/store';
import liveSessionReducer from '../../feature/OneToOneSession/store';
import onboardingReducer from '../../feature/Home/Tabs/CompleteProfessionalID/store';
import earningReducer from '../../feature/Earning/store';

const rootReducer = combineReducers({
  header: headerReducer,
  auth: authReducer,
  meta: metaReducer,
  customers: customersReducer,
  analytics: analyticsReducer,
  notifications: notificationsReducer,
  loading: loadingReducer,
  error: errorReducer,
  myProfile: myProfileReducer,
  home: homeReducer,
  dashboard: dashboardReducer,
  sideMenu: sideMenuReducer,
  chat: chatReducer,
  liveSession: liveSessionReducer,
  onboarding: onboardingReducer,
  earning: earningReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
