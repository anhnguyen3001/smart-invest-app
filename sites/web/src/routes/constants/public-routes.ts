import { lazy } from 'react';
import {
  FORGOT_PASSWORD_PATH,
  RESET_PASSWORD_PATH,
  SIGNIN_PATH,
  SIGNUP_PATH,
  VERIFY_USER_PATH,
} from 'src/constants';
import { IRoute } from 'src/types';

const Signin = lazy(() =>
  import('src/pages/Signin').then((mod) => ({ default: mod.Signin })),
);
const Signup = lazy(() =>
  import('src/pages/Signup').then((mod) => ({ default: mod.Signup })),
);
const VerifyUser = lazy(() =>
  import('src/pages/VerifyUser').then((mod) => ({ default: mod.VerifyUser })),
);
const ForgotPassword = lazy(() =>
  import('src/pages/ForgotPassword').then((mod) => ({
    default: mod.ForgotPassword,
  })),
);
const ResetPassword = lazy(() =>
  import('src/pages/ResetPassword').then((mod) => ({
    default: mod.ResetPassword,
  })),
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
  {
    exact: true,
    path: FORGOT_PASSWORD_PATH,
    component: ForgotPassword,
  },
  {
    exact: true,
    path: RESET_PASSWORD_PATH,
    component: ResetPassword,
  },
  {
    exact: true,
    path: VERIFY_USER_PATH,
    component: VerifyUser,
  },
];
