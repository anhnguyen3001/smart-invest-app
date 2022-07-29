import { IRoute } from 'src/types';

export interface RouteProps extends IRoute {
  isAuthenticated: boolean;
}
