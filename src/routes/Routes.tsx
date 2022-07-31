import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Loading } from 'src/components';
import { useApp } from 'src/contexts';
import { useAxios } from 'src/hooks/useAxios';
import { publicRoutes } from './constants';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoute } from './PublicRoute';

export const Routes: React.FC = () => {
  const { loading } = useApp();
  useAxios();

  return (
    <Loading loading={loading}>
      <Router>
        <Switch>
          {publicRoutes.map((route) => (
            <PublicRoute key={route.path} {...route} />
          ))}
          <PrivateRoutes />
        </Switch>
      </Router>
    </Loading>
  );
};
