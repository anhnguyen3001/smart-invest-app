import React from 'react';
import {
  RESEARCH_CENTER_PATH,
  HOME_PATH,
  WATCH_LIST_PATH,
} from 'src/constants';

export interface MenuHeaderProps {
  activeMenuItem: string;
  themeMenuItem: React.ReactNode;
  localizationMenuItem: React.ReactNode;
  onSearchStock?: (keyword: string) => void;
}

export const getNavbarLinks = (
  t: any,
): {
  to: string;
  title: string;
}[] => [
  {
    to: HOME_PATH,
    title: t('Discovery'),
  },
  {
    to: RESEARCH_CENTER_PATH,
    title: t('ResearchCenter'),
  },
  {
    to: WATCH_LIST_PATH,
    title: t('Watchlist'),
  },
];
