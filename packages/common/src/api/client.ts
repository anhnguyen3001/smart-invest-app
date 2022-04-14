import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

let bffClient: AxiosInstance;

interface CustomAxiosConfig {
  requestInterceptors?: {
    onFulfilled?: (request: AxiosRequestConfig) => AxiosRequestConfig;
    onRejected?: (request: AxiosRequestConfig) => AxiosRequestConfig;
  };
  responseInterceptors?: {
    onFulfilled?: (response: AxiosResponse) => AxiosResponse;
    onRejected?: (response: AxiosError) => any;
  };
}

export const initBffClient = (
  baseURL: string,
  configs?: CustomAxiosConfig,
): void => {
  bffClient = axios.create({
    baseURL,
  });

  const { requestInterceptors, responseInterceptors } = configs || {};

  if (requestInterceptors) {
    bffClient.interceptors.request.use(
      requestInterceptors.onFulfilled,
      requestInterceptors.onRejected,
    );
  }

  if (responseInterceptors) {
    bffClient.interceptors.response.use(
      responseInterceptors.onFulfilled,
      responseInterceptors.onRejected,
    );
  }
};

export const getBffClient = (): AxiosInstance => {
  if (!bffClient) {
    throw new Error('Need initialize bff client');
  }

  return bffClient;
};

let imageClient: AxiosInstance;
export const initImageClient = (baseURL: string): void => {
  imageClient = axios.create({ baseURL });
};

export const getImageClient = (): AxiosInstance => {
  if (!imageClient) {
    throw new Error('Need initialize image axios instance');
  }

  return imageClient;
};
