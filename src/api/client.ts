import axios, { AxiosInstance } from 'axios';
import { getEnv } from 'src/helpers';

const bffClient: AxiosInstance = axios.create({
  baseURL: getEnv('BFF_ENDPOINT'),
});

const imageClient: AxiosInstance = axios.create({
  baseURL: getEnv('IMAGE_ENDPOINT'),
});

export { imageClient, bffClient };
