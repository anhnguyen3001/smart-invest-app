import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { publicRoutes } from './constants';
import { PrivateRoutes } from './PrivateRoutes';

export const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        {/* <PublicLayout>
        
        </PublicLayout> */}
        {publicRoutes.map((route) => (
          <Route key={route.path} {...route} />
        ))}

        <Route path="/" component={PrivateRoutes} />
      </Switch>
    </Router>
  );
};
