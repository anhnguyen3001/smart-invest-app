import { lazy } from 'react';
import { SIGNIN_PATH, SIGNUP_PATH } from 'src/constants';
import { IRoute } from 'src/types';

const Signin = lazy(() =>
  import('../../pages/signin').then((mod) => ({ default: mod.Signin })),
);
const Signup = lazy(() =>
  import('../../pages/signup').then((mod) => ({ default: mod.Signup })),
);

export const publicRoutes: IRoute[] = [
  // App pages
  {
    exact: true,
    path: SIGNIN_PATH,
    component: Signin,
  },
  {
    exact: true,
    path: SIGNUP_PATH,
    component: Signup,
  },
];
