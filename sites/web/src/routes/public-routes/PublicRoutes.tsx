import React from "react";
import { Route, Switch } from "react-router-dom";
import { routes } from "./routes";

export const PublicRoutes: React.FC = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </Switch>
  );
};
