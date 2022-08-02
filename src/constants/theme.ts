import { Theme } from 'src/types';

export const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
};
export const DEFAULT_THEME = THEME.DARK;

export const COLOR_THEME: {
  [key: string]: Theme;
} = {
  [THEME.DARK]: {
    bgComponent: '#24262e',
    textPrimary: '#ebeced',
    textSecondary: '#757a8b',
    primaryColor: '#dc3a61',
    successColor: '#539067',
    errorColor: '#f46868',
    borderColor: '#3d3c41',
    lightBg: '#24262e',
  },
  [THEME.LIGHT]: {
    bgComponent: '#f2f2f7',
    textPrimary: '#11263c',
    textSecondary: '#393d56',
    primaryColor: '#dc3a61',
    successColor: '#539067',
    errorColor: '#f46868',
    borderColor: '#3d3c41',
    lightBg: '#f2f2f7',
  },
};
