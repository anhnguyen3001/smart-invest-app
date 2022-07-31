import { GetNewsParams, GetNewsResponse } from 'src/types';
import { coreClient } from '../client';

export const newsService = {
  getNews: async (params?: GetNewsParams): Promise<GetNewsResponse> => {
    const res = await coreClient.get('/news', { params });
    return res.data.data;
  },
};
