import {
  GetFinancialStatementParams,
  GetFinancialStatementsReponse,
} from 'src/types';
import { getCoreClient } from '../client';

export const financialStatementService = {
  getList: async (
    params: GetFinancialStatementParams,
  ): Promise<GetFinancialStatementsReponse> => {
    const axios = getCoreClient();
    const res = await axios.get('/financial-statements', { params });
    return res.data.data;
  },
};
