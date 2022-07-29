// import { createBrowserHistory } from "history";

// export const browserHistory = createBrowserHistory();

export * from './common';
export * from './formater';
export * from './img-processor';
export * from './localization';
export * from './localStorage';
export * from './ticker';
export * from './user';

export const getEnv = (key: string) => {
  return process.env[`REACT_APP_${key}`] || '';
};