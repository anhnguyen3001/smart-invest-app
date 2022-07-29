import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { HOME_PATH, SIGNIN_PATH } from 'src/constants';
import { isAuthenticatedUser } from 'src/helpers';
import { PrivateLayout } from 'src/layouts';
import { privateRoutes } from './constants';

export const PrivateRoutes: React.FC = () => {
  const history = useHistory();

  // useEffect(() => {
  //   const isAuthenticated = isAuthenticatedUser();

  //   if (!isAuthenticated) {
  //     history.push(SIGNIN_PATH);
  //   }
  //   // eslint-disable-next-line
  // }, []);

  return (
    <Switch>
      {privateRoutes.map(({ component, ...rest }) => (
        // <PrivateLayout>
        <Route
          key={rest.path}
          {...rest}
          render={(props) => (
            <PrivateLayout>
              {React.createElement(component, props)}
            </PrivateLayout>
          )}
        />
      ))}
      <Redirect to={HOME_PATH} />
    </Switch>
  );
};
