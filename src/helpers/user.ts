import { getLS } from './localStorage';

export const isAuthenticatedUser = () => {
  return !!getAccessToken();
};

export const getAccessToken = () => {
  const user = getLS('user') || '{}';
  const { accessToken } = JSON.parse(user);
  return accessToken;
};

export const getRefreshToken = () => {
  const user = getLS('user') || '{}';
  const { refreshToken } = JSON.parse(user);
  return refreshToken;
};
