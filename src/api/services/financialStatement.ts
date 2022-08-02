import {
  GetFinancialStatementParams,
  GetFinancialStatementsReponse,
} from 'src/types';
import { bffClient } from '../client';

export const financialStatementService = {
  getList: async (
    params: GetFinancialStatementParams,
  ): Promise<GetFinancialStatementsReponse> => {
    const res = await bffClient.get('/financial-statements', { params });
    return res.data.data;
  },
};
