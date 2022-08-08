import {
  GetPredictedPriceParams,
  GetPredictedPriceResponse,
  GetTickerPriceParams,
  GetTickerPriceResponse,
  GetTickersNotFavoriteParams,
  GetTickersParams,
  GetTickersReponse,
} from 'src/types';
import { bffClient } from '../client';

export const tickerService = {
  getTickers: async (params: GetTickersParams): Promise<GetTickersReponse> => {
    const res = await bffClient.get('/tickers', { params });
    return res.data.data;
  },

  getTickersNotFavorite: async (
    params: GetTickersNotFavoriteParams,
  ): Promise<GetTickersReponse> => {
    const res = await bffClient.get('/tickers/new-favorite-tickers', {
      params,
    });
    return res.data.data;
  },

  getTickerPrice: async (
    params: GetTickerPriceParams,
  ): Promise<GetTickerPriceResponse> => {
    const res = await bffClient.get('/tickers/price', { params });
    return res.data.data;
  },

  getPredicted: async (
    params: GetPredictedPriceParams,
  ): Promise<GetPredictedPriceResponse> => {
    const res = await bffClient.get('/tickers/predicted-price', { params });
    return res.data.data;
  },
};
