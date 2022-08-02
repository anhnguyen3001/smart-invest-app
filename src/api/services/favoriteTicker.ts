import { GetTickersReponse, UpsertResponse } from 'src/types';
import { GetFavoriteTickersParams } from 'src/types/favoriteTicker';
import { bffClient } from '../client';

export const favoriteTickerService = {
  getLists: async (
    params: GetFavoriteTickersParams,
  ): Promise<GetTickersReponse> => {
    const res = await bffClient.get('/favorite-tickers', {
      params,
    });
    return res.data.data;
  },
  addTicker: async (
    companyId: number,
    listId: number,
  ): Promise<UpsertResponse> => {
    const res = await bffClient.post('/favorite-tickers', {
      companyId,
      listId,
    });
    return res.data.data;
  },
};
