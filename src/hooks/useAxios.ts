import { notification } from 'antd';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { initBffClient, initImageClient } from 'src/api';
import { initCoreClient } from 'src/api/client';
import { getEnv } from 'src/helpers';

export const useAxios = (accessToken: string = '', logout: () => void) => {
  const { t } = useTranslation();

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

  const requestInterceptor = (request: AxiosRequestConfig) => {
    if (request.headers && accessToken) {
      request.headers.authorization = `Bearer ${accessToken}`;
    }
    return request;
  };

  const responseSuccessInterceptor = (response: AxiosResponse) => {
    // Do something with response data
    return response;
  };

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  const responseErrorInterceptor = (error: AxiosError) => {
    // Do something with response error
    handleResponseError(error);
    return Promise.reject(error);
  };

  useEffect(() => {
    const imageEndpoint = getEnv('IMAGE_ENDPOINT');
    initImageClient(imageEndpoint);

    const coreEndpoint = getEnv('CORE_ENDPOINT');
    initCoreClient(coreEndpoint);
  }, []);

  useEffect(() => {
    const endpoint = getEnv('AUTH_ENDPOINT');
    initBffClient(endpoint, {
      requestInterceptors: {
        onFulfilled: (request) => requestInterceptor(request),
      },
      responseInterceptors: {
        onFulfilled: (response) => responseSuccessInterceptor(response),
        onRejected: (response) => responseErrorInterceptor(response),
      },
    });
    // eslint-disable-next-line
  }, [accessToken]);
};
