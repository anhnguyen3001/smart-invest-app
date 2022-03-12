import { lazy } from 'react';
import { SIGNIN_PATH, PAGE_404 } from 'src/constants';
import { IRoute } from 'src/types';

const Page404 = lazy(() =>
  import('../../pages/shared/page404').then((mod) => ({
    default: mod.Page404,
  })),
);

const Signin = lazy(() =>
  import('../../pages/signin').then((mod) => ({ default: mod.Signin })),
);

export const publicRoutes: IRoute[] = [
  {
    exact: true,
    path: PAGE_404,
    component: Page404,
  },
  // App pages
  {
    exact: true,
    path: SIGNIN_PATH,
    component: Signin,
  },
];
