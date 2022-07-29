import { lazy } from 'react';
import {
  DETAIL_PATH,
  HOME_PATH,
  RESEARCH_CENTER_PATH,
  SEARCH_PATH,
  SETTING_PATH,
  WATCH_LIST_PATH,
} from 'src/constants';
import { IRoute } from 'src/types';

// App pages
const Home = lazy(() =>
  import('src/pages/Home').then((mod) => ({ default: mod.Home })),
);
const ResearchCenter = lazy(() =>
  import('src/pages/ResearchCenter').then((mod) => ({
    default: mod.ResearchCenter,
  })),
);
const Detail = lazy(() =>
  import('src/pages/Detail').then((mod) => ({ default: mod.Detail })),
);
const Search = lazy(() =>
  import('src/pages/Search').then((mod) => ({ default: mod.Search })),
);
const Setting = lazy(() =>
  import('src/pages/Setting').then((mod) => ({ default: mod.Setting })),
);
const WatchList = lazy(() =>
  import('src/pages/WatchList').then((mod) => ({ default: mod.WatchList })),
);

export const privateRoutes: IRoute[] = [
  // App pages
  {
    exact: true,
    path: HOME_PATH,
    component: Home,
  },
  {
    exact: true,
    path: RESEARCH_CENTER_PATH,
    component: ResearchCenter,
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
  {
    exact: true,
    path: SETTING_PATH,
    component: Setting,
  },
  {
    exact: true,
    path: WATCH_LIST_PATH,
    component: WatchList,
  },
];
