import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

let axiosInstance: AxiosInstance;

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

export const initAxiosInstance = (
  baseURL: string,
  configs?: CustomAxiosConfig,
) => {
  axiosInstance = axios.create({
    baseURL,
  });

  const { requestInterceptors, responseInterceptors } = configs || {};

  if (requestInterceptors) {
    axiosInstance.interceptors.request.use(
      requestInterceptors.onFulfilled,
      requestInterceptors.onRejected,
    );
  }

  if (responseInterceptors) {
    axiosInstance.interceptors.response.use(
      responseInterceptors.onFulfilled,
      responseInterceptors.onRejected,
    );
  }
};

export const getAxios = () => {
  if (!axiosInstance) {
    throw new Error('Need initialize axios instance');
  }

  return axiosInstance;
};

let imageApi: AxiosInstance;
export const initImageClient = (baseURL: string) => {
  imageApi = axios.create({ baseURL });
};

export const getImageAxios = () => {
  if (!imageApi) {
    throw new Error('Need initialize image axios instance');
  }

  return imageApi;
};
