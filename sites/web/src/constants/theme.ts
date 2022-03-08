import { ITheme } from "src/types";

export const THEME = {
  DARK: "dark",
  LIGHT: "light",
};
export const DEFAULT_THEME = THEME.DARK;

export const COLOR_THEME: {
  [key: string]: ITheme;
} = {
  [THEME.DARK]: {
    bgComponent: "#5858731f",
    textSecondary: "#ebebf599",
    primaryColor: "#5E5CE6",
    successColor: "#539067",
    errorColor: "#f46868",
    borderColor: "#3d3c41",
  },
  [THEME.LIGHT]: {
    bgComponent: "#5858731f",
    textSecondary: "#ebebf599",
    primaryColor: "#5E5CE6",
    successColor: "#539067",
    errorColor: "#f46868",
    borderColor: "#3d3c41",
  },
};
