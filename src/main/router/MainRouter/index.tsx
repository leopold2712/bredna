import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoading } from '../../../shared/components/Header/store';
import { useAppSelector } from '../../store/hooks';
import { getGlobalLoading } from '../../../shared/store/loading/selectors';

import { Loader } from '../../../shared/components/Loader';
import PrivateRoute from '../../../shared/components/PrivateRoute';
import Page404 from '../../../shared/components/Page404';
import ScrollToTop from '../../../shared/components/ScrollToTop';

import Home from '../../../feature/Home/pages/HomeMain';
import Analytics from '../../../feature/Analytics/pages';
import Customers from '../../../feature/Customers/pages/TableMain';
import SelectedClient from '../../../feature/Customers/pages/SelectedClientMain';
import { ConversationsMain } from '../../../feature/Conversations/pages';
import OneToOneSessionPage from '../../../feature/OneToOneSession/pages/OneToOneSessionPage';
import MyProfile from '../../../feature/MyProfile/pages/MyProfileMain';
import Settings from '../../../feature/Settings/pages/SettingsMenu';
import Payments from '../../../feature/Settings/pages/Payments';
import Notifications from '../../../feature/Settings/pages/Notifications';
import { LegalSettings } from '../../../feature/Settings/pages/Legal';
import PrivacyPolicy from '../../../feature/Legal/pages/PrivacyPolicy';
import TermsAndConditions from '../../../feature/Legal/pages/TermsOfUse';
import { EarningPage } from '../../../feature/Earning/Pages';

export default function MainRouter(): JSX.Element {
  const isLoading = useSelector(getIsLoading);
  const isLoadingGlobal = useAppSelector(getGlobalLoading);

  return (
    <>
      {isLoading && <Loader />}
      {isLoadingGlobal && <Loader />}
      <ScrollToTop />

      <Switch>
        <PrivateRoute exact path="/home">
          <Home />
        </PrivateRoute>
        <PrivateRoute path="/analytics">
          <Analytics />
        </PrivateRoute>
        <PrivateRoute exact path="/clients">
          <Customers />
        </PrivateRoute>
        <PrivateRoute path="/clients/:id">
          <SelectedClient />
        </PrivateRoute>
        <PrivateRoute exact path="/chat">
          <ConversationsMain />
        </PrivateRoute>
        <PrivateRoute exact path="/live-session">
          <OneToOneSessionPage />
        </PrivateRoute>
        <PrivateRoute exact path="/live-session/:id">
          <OneToOneSessionPage />
        </PrivateRoute>
        <PrivateRoute path="/my-profile">
          <MyProfile />
        </PrivateRoute>

        <PrivateRoute path="/earning">
          <EarningPage />
        </PrivateRoute>

        <PrivateRoute exact path="/settings">
          <Settings />
        </PrivateRoute>
        <PrivateRoute path="/settings/payments">
          <Payments />
        </PrivateRoute>
        <PrivateRoute path="/settings/notifications">
          <Notifications />
        </PrivateRoute>
        <PrivateRoute path="/settings/legal">
          <LegalSettings />
        </PrivateRoute>
        <PrivateRoute path="/privacy">
          <PrivacyPolicy />
        </PrivateRoute>
        <PrivateRoute path="/terms-of-use">
          <TermsAndConditions />
        </PrivateRoute>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </>
  );
}
