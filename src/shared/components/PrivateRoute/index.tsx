import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';

import { RootState } from '../../../main/store/rootReducer';
import { AuthState } from '../../../feature/Onboarding/store';

const PrivateRoute = ({ children, ...rest }: RouteProps): JSX.Element => {
  const { isAuthenticated, loading } = useSelector<RootState, AuthState>((state) => state.auth);

  return (
    <Route
      {...rest}
      render={({ location }: RouteComponentProps) => {
        if (loading) {
          return <div />;
        }

        if (isAuthenticated) {
          return children;
        }

        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
