import { lazy } from 'react';
import {
  DETAIL_PATH,
  HOME_PATH,
  PAGE_403,
  PAGE_404,
  PAGE_500,
  SEARCH_PATH,
} from 'src/constants';
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

// App pages
const Home = lazy(() =>
  import('../../pages/home').then((mod) => ({ default: mod.Home })),
);
const Detail = lazy(() =>
  import('../../pages/detail').then((mod) => ({ default: mod.Detail })),
);
const Search = lazy(() =>
  import('../../pages/search').then((mod) => ({ default: mod.Search })),
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
    path: HOME_PATH,
    component: Home,
  },
  {
    exact: true,
    path: DETAIL_PATH,
    component: Detail,
  },
  {
    exact: true,
    path: SEARCH_PATH,
    component: Search,
  },
];
