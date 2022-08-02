import React from 'react';
import { NEWS_PATH, HOME_PATH, LIBRARY_PATH } from 'src/constants';

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
    to: NEWS_PATH,
    title: t('News'),
  },
];
