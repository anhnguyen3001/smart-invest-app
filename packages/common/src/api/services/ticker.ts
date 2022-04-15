import {
  GetPredictedPriceParams,
  GetTickerPriceParams,
  GetTickerPriceResponse,
  GetTickersParams,
  GetTickersReponse,
} from 'src/types';
import { getCoreClient } from '../client';

export const tickerService = {
  getTickers: async (params: GetTickersParams): Promise<GetTickersReponse> => {
    const axios = getCoreClient();
    const res = await axios.get('/tickers', { params });
    return res.data.data;
  },

  getTickerPrice: async (
    params: GetTickerPriceParams,
  ): Promise<GetTickerPriceResponse> => {
    const axios = getCoreClient();
    const res = await axios.get('/tickers/price', { params });
    return res.data.data;
  },

  getPredicted: async (params: GetPredictedPriceParams): Promise<void> => {
    const axios = getCoreClient();
    await axios.get('/tickers/predicted-price', { params });
  },
};
