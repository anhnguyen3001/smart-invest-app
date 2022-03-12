import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import { SiteLayout } from 'src/layouts';

export const PrivateRoutes: React.FC = () => {
  // Add login guard

  return (
    <SiteLayout>
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Switch>
    </SiteLayout>
  );
};
