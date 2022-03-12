import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PAGE_404 } from 'src/constants';
import { PrivateLayout } from 'src/layouts';
import { privateRoutes } from './constants';

export const PrivateRoutes: React.FC = () => {
  // Add login guard

  return (
    <PrivateLayout>
      <Switch>
        {privateRoutes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        <Redirect to={PAGE_404} />
      </Switch>
    </PrivateLayout>
  );
};
