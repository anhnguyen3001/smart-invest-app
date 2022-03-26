import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { HOME_PATH } from 'src/constants';
import { PublicLayout } from 'src/layouts';
import { RouteProps } from './common';

export const PublicRoute: React.FC<RouteProps> = ({
  isAuthenticated,
  component,
  ...rest
}) => {
  if (isAuthenticated) {
    return <Redirect to={HOME_PATH} />;
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <PublicLayout>{React.createElement(component, props)}</PublicLayout>
      )}
    />
  );
};
