import {
  GetPredictedPriceParams,
  GetTickerPriceParams,
  GetTickerPriceResponse,
  GetTickersParams,
  GetTickersReponse,
} from 'src/types';
import { bffClient } from '../client';

export const tickerService = {
  getTickers: async (params: GetTickersParams): Promise<GetTickersReponse> => {
    const res = await bffClient.get('/tickers', { params });
    return res.data.data;
  },

  getTickerPrice: async (
    params: GetTickerPriceParams,
  ): Promise<GetTickerPriceResponse> => {
    const res = await bffClient.get('/tickers/price', { params });
    return res.data.data;
  },

  getPredicted: async (params: GetPredictedPriceParams): Promise<void> => {
    await bffClient.get('/tickers/predicted-price', { params });
  },
};
