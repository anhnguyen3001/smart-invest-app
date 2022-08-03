import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { HOME_PATH } from 'src/constants';
import { useAuth } from 'src/contexts';
import { PublicLayout } from 'src/layouts';
import { IRoute } from 'src/types';

export const PublicRoute: React.FC<IRoute> = ({
  component,
  children,
  ...rest
}) => {
  const { accessToken } = useAuth();

  if (accessToken) {
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
