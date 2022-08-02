import { PERSONAL_TAB_KEY } from './common';

export const HOME_PATH = '/';
export const SEARCH_PATH = '/search';
export const NEWS_PATH = '/news';

export const DETAIL_PATH = '/tickers/:companyId';
export const TICKERS_PATH = '/tickers';

export const LIBRARY_PATH = '/library';
export const CHANGE_PASSWORD_PATH = `${LIBRARY_PATH}?tab=${PERSONAL_TAB_KEY.changePassword}`;
export const UPDATE_PROFILE_PATH = `${LIBRARY_PATH}?tab=${PERSONAL_TAB_KEY.updateProfile}`;

export const SIGNIN_PATH = '/signin';
export const SIGNUP_PATH = '/signup';
export const FORGOT_PASSWORD_PATH = '/forgot-password';

export const TEST_PATH = '/404';
