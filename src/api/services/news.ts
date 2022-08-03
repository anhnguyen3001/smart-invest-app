import {
  GetFavoriteNewsParams,
  GetNewsParams,
  GetNewsResponse,
} from 'src/types';
import { bffClient } from '../client';

export const newsService = {
  getNews: async (params?: GetNewsParams): Promise<GetNewsResponse> => {
    const res = await bffClient.get('/news', { params });
    return res.data.data;
  },
  getFavoriteNews: async (
    params?: GetFavoriteNewsParams,
  ): Promise<GetNewsResponse> => {
    const res = await bffClient.get('/news/me', { params });
    return res.data.data;
  },
};
