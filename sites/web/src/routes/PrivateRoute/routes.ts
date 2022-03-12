import { lazy } from 'react';
import { DETAIL_PATH, HOME_PATH, SEARCH_PATH } from 'src/constants';
import { IRoute } from 'src/types';

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
