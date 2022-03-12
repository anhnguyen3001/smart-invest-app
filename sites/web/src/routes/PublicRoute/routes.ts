import { lazy } from 'react';
import { LOGIN_PATH, PAGE_403, PAGE_404, PAGE_500 } from 'src/constants';
import { IRoute } from 'src/types';

// Common pages
const Page403 = lazy(() =>
  import('../../pages/shared/page403').then((mod) => ({
    default: mod.Page403,
  })),
);
const Page404 = lazy(() =>
  import('../../pages/shared/page404').then((mod) => ({
    default: mod.Page404,
  })),
);
const Page500 = lazy(() =>
  import('../../pages/shared/page500').then((mod) => ({
    default: mod.Page500,
  })),
);

const Login = lazy(() =>
  import('../../pages/login').then((mod) => ({ default: mod.Login })),
);

export const routes: IRoute[] = [
  {
    exact: true,
    path: PAGE_403,
    component: Page403,
  },
  {
    exact: true,
    path: PAGE_404,
    component: Page404,
  },
  {
    exact: true,
    path: PAGE_500,
    component: Page500,
  },
  // App pages
  {
    exact: true,
    path: LOGIN_PATH,
    component: Login,
  },
];
