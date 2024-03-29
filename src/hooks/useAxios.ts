import { notification } from 'antd';
import { AxiosError } from 'axios';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { bffClient } from 'src/api/client';
import { useAuth } from 'src/contexts';

export const useAxios = () => {
  const { t } = useTranslation();
  const { accessToken, logout } = useAuth();

  const handleResponseError = useCallback((error: AxiosError) => {
    const response = error.response;
    const status = response?.status;
    switch (status) {
      case 401:
        logout();
        notification.error({ message: t('YourSessionIsExpired') });
        break;
      default:
        // Handle error message from API response
        const code = response?.data?.code;
        let message = null;

        if (error.response && error.response.data) {
          const { data } = error.response;
          message = data?.details?.data?.message || data.message;
        }
        notification.error({
          message: `${message || t('SomethingWentWrong')}`,
          duration: 3,
        });
        break;
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    bffClient.interceptors.request.use((request) => {
      if (request.headers && accessToken) {
        request.headers.authorization = `Bearer ${accessToken}`;
      }
      return request;
    });
    bffClient.interceptors.response.use(undefined, (error) => {
      handleResponseError(error);
      return Promise.reject(error);
    });
    // eslint-disable-next-line
  }, [accessToken]);
};
