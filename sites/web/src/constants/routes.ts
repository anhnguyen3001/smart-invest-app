import { SETTING_TAB_KEY } from './common';

export const HOME_PATH = '/home';
export const SEARCH_PATH = '/search';
export const RESEARCH_CENTER_PATH = '/research-center';

export const DETAIL_PATH = '/stocks/:stockCode';
export const STOCKS_PATH = '/stocks';

export const WATCH_LIST_PATH = '/watch-list';
export const SETTING_PATH = '/setting';
export const CHANGE_PASSWORD_PATH = `/setting?tab=${SETTING_TAB_KEY.changePassword}`;
export const UPDATE_PROFILE_PATH = `/setting?tab=${SETTING_TAB_KEY.updateProfile}`;

export const SIGNIN_PATH = '/signin';
export const SIGNUP_PATH = '/signup';
export const VERIFY_USER_PATH = '/verify';
export const FORGOT_PASSWORD_PATH = '/forgot-password';
export const RESET_PASSWORD_PATH = '/reset-password';

export const TEST_PATH = '/404';
