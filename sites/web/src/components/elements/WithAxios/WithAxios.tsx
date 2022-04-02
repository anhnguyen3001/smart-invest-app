import { initAxiosInstance, initImageClient } from '@ah-ticker/common';
import { notification } from 'antd';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useAuth } from 'src/context';

export const WithAxios: React.FC = ({ children }) => {
  const { accessToken, logout } = useAuth();

  const handleResponseError = useCallback((error: AxiosError) => {
    const status = error && error.response && error.response.status;
    switch (status) {
      case 401:
        logout();
        break;
      default:
        // Handle error message from API response
        const code = error.response?.data?.code;
        let message = null;

        if (error.response && error.response.data) {
          const { data } = error.response;
          message = data?.details?.data?.message || data.message;
        }
        notification.error({
          message,
          // message: `${message || t('SomethingWentWrong')}`,
        });
        break;
    }
    // eslint-disable-next-line
  }, []);

  const requestInterceptor = (request: AxiosRequestConfig) => {
    if (request.headers && accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
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
    const imageEndpoint: string = process.env.REACT_APP_IMAGE_ENDPOINT || '';
    initImageClient(imageEndpoint);
  }, []);

  useEffect(() => {
    const endpoint: string = process.env.REACT_APP_AUTH_ENDPOINT || '';
    initAxiosInstance(endpoint, {
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

  return <>{children}</>;
};
