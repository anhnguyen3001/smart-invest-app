import {
  GetFinancialIndexesParams,
  GetFinancialIndexesReponse,
} from 'src/types';
import { bffClient } from '../client';

export const financialIndexService = {
  getList: async (
    params: GetFinancialIndexesParams,
  ): Promise<GetFinancialIndexesReponse> => {
    const res = await bffClient.get('/financial-indexes', { params });
    return res.data.data;
  },
};
