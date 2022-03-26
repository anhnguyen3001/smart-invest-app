import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken } from 'src/helpers';
// import { t } from 'src/helpers';
import { notification } from 'antd';
import { initAxiosInstance } from '@ah-ticker/common';

const handleResponseError = (error: AxiosError) => {
  const status = error && error.response && error.response.status;
  switch (status) {
    case 401:
      // logout();
      console.log('401');
      break;
    case 403:
      console.log('403');
      // denyAccess();
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
};

const requestInterceptor = (request: AxiosRequestConfig) => {
  const accessToken = getAccessToken();
  if (request.headers && accessToken) {
    request.headers.Authorization = `Bearer ${getAccessToken()}`;
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

export const initApiService = () => {
  const endpoint: string = process.env.REACT_APP_AUTH_ENDPOINT || '';
  initAxiosInstance(endpoint, {
    requestInterceptors: { onFulfilled: requestInterceptor },
    responseInterceptors: {
      onFulfilled: responseSuccessInterceptor,
      onRejected: responseErrorInterceptor,
    },
  });
};
