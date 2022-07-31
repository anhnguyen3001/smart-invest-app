import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { HOME_PATH, SIGNIN_PATH } from 'src/constants';
import { useAuth } from 'src/contexts';
import { PrivateLayout } from 'src/layouts';
import { privateRoutes } from './constants';

export const PrivateRoutes: React.FC = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Redirect to={SIGNIN_PATH} />;
  }

  return (
    <Switch>
      <PrivateLayout>
        {privateRoutes.map(({ component, ...rest }) => (
          <Route
            key={rest.path}
            {...rest}
            render={(props) => React.createElement(component, props)}
          />
        ))}
      </PrivateLayout>

      <Redirect to={HOME_PATH} />
    </Switch>
  );
};
