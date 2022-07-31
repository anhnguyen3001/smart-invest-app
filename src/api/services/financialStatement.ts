import {
  GetFinancialStatementParams,
  GetFinancialStatementsReponse,
} from 'src/types';
import { coreClient } from '../client';

export const financialStatementService = {
  getList: async (
    params: GetFinancialStatementParams,
  ): Promise<GetFinancialStatementsReponse> => {
    const res = await coreClient.get('/financial-statements', { params });
    return res.data.data;
  },
};
