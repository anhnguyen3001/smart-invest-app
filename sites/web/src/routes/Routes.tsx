import React from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { Loading } from 'src/components';
import { HOME_PATH } from 'src/constants';
import { useApp, useAuth } from 'src/context';
import { privateRoutes, publicRoutes } from './constants';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const Routes: React.FC = () => {
  const { loading } = useApp();
  const { accessToken } = useAuth();

  return (
    <Loading loading={loading}>
      <Router>
        <Switch>
          {publicRoutes.map((route) => (
            <PublicRoute
              key={route.path}
              isAuthenticated={!!accessToken}
              {...route}
            />
          ))}
          {privateRoutes.map((route) => (
            <PrivateRoute
              key={route.path}
              isAuthenticated={!!accessToken}
              {...route}
            />
          ))}
          <Redirect exact to={HOME_PATH} />
        </Switch>
      </Router>
    </Loading>
  );
};
