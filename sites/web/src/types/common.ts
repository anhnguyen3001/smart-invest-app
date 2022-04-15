import { Locale } from 'antd/lib/locale-provider';

export interface IRegionItem {
  key: string;
  name: string;
  flag: string | React.ReactNode;
  antdLocale: Locale;
}

export interface IRegion {
  [key: string]: IRegionItem;
}

export interface IRoute {
  exact: boolean;
  path: string;
  component: React.LazyExoticComponent<React.FC>;
}

export interface Theme {
  bgComponent: string;
  textPrimary: string;
  textSecondary: string;
  primaryColor: string;
  successColor: string;
  errorColor: string;
  borderColor: string;
}

export interface StyleProps {
  className?: string;
}
