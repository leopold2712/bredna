import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import MainLayout from '../../../shared/components/MainLayout';
import MainRouter from '../MainRouter';
import Signup from '../../../feature/Onboarding/Signup';
import { Login } from '../../../feature/Onboarding/pages/Login';
import { ForgotPassword } from '../../../feature/Onboarding/pages/ForgotPassword';
import { meAsync } from '../../../feature/Onboarding/store/actions';
import { AuthState } from '../../../feature/Onboarding/store';
import { RootState } from '../../store/rootReducer';
import { NewPassword } from '../../../feature/Onboarding/NewPassword';
import HeyToast from '../../../shared/components/HeyToast';
import { getMetaInfoAsync } from '../../../shared/store/meta/actions';
import { AnalyticsService } from '../../../shared/services/analytics';
import TermsAndConditions from '../../../feature/Onboarding/TermsAndConditions';
import { InitialLoading } from '../../../shared/components/InitialLoading';

export const AppRouter = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuthenticated } = useSelector<RootState, AuthState>((state) => state.auth);

  const [defaultUrl, setDefaultUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const getInitialData = async () => {
    await dispatch(getMetaInfoAsync());
    await dispatch(meAsync());
  };

  const startSession = async () => {
    await getInitialData();
    setDefaultUrl(`/home`);

    if (sessionStorage.getItem('redirect-url')) {
      const redirectPath = sessionStorage.getItem('redirect-url');
      sessionStorage.removeItem('redirect-url');
      history.push(redirectPath as string);
    }

    if (history.location.pathname === '/') {
      history.push(`/home`);
    }

    setLoading(false);
  };

  useEffect(() => {
    AnalyticsService.pageView();
  }, [location]);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      startSession();
    } else if (defaultUrl) {
      setDefaultUrl('');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const pathName = history.location.pathname;
    const searchParams = history.location.search;
    if (
      pathName !== '/' &&
      pathName !== '/signup' &&
      pathName !== '/forgot-password' &&
      pathName !== '/new_password' &&
      !isAuthenticated
    ) {
      sessionStorage.setItem('redirect-url', pathName + searchParams);
    }
  }, []);

  if (loading) return <InitialLoading />;

  return (
    <Switch>
      <Route exact path="/login">
        {isAuthenticated && defaultUrl ? <Redirect to={defaultUrl} /> : <Login />}
      </Route>
      <Route exact path="/signup">
        {isAuthenticated && defaultUrl ? <Redirect to={defaultUrl} /> : <Signup />}
      </Route>
      <Route exact path="/invite">
        {isAuthenticated && defaultUrl ? <Redirect to={defaultUrl} /> : <Signup />}
      </Route>
      <Route exact path="/forgot-password">
        {isAuthenticated && defaultUrl ? <Redirect to={defaultUrl} /> : <ForgotPassword />}
      </Route>
      <Route exact path="/new_password">
        {isAuthenticated && defaultUrl ? <Redirect to={defaultUrl} /> : <NewPassword />}
      </Route>
      <Route exact path="/terms">
        <TermsAndConditions />
      </Route>
      {isAuthenticated && defaultUrl && (
        <Route path="/">
          <MainLayout>
            <>
              <MainRouter />
              <HeyToast
                ref={(ref) => {
                  HeyToast.setRef(ref);
                }}
              />
            </>
          </MainLayout>
        </Route>
      )}
      <Route>{isAuthenticated && defaultUrl ? <Redirect to={defaultUrl} /> : <Login />}</Route>
    </Switch>
  );
};
