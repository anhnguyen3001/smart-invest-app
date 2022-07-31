import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { SIGNIN_PATH } from 'src/constants';
import { useAuth } from 'src/contexts';
import { PrivateLayout } from 'src/layouts';
import { IRoute } from 'src/types';

export const PrivateRoute: React.FC<IRoute> = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <PrivateLayout>{React.createElement(component, props)}</PrivateLayout>
      )}
    />
  );
};
