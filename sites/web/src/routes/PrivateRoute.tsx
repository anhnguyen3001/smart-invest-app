import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { SIGNIN_PATH } from 'src/constants';
import { PrivateLayout } from 'src/layouts';
import { RouteProps } from './common';

export const PrivateRoute: React.FC<RouteProps> = ({
  isAuthenticated,
  component,
  ...rest
}) => {
  if (!isAuthenticated) {
    return <Redirect to={SIGNIN_PATH} />;
  }

  return (
    <Route
      key={rest.path}
      {...rest}
      render={(props) => (
        <PrivateLayout>{React.createElement(component, props)}</PrivateLayout>
      )}
    />
  );
};
