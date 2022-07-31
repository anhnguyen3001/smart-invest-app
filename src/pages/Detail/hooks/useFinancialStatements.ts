import { financialStatementService } from 'src/api';
import { GetFinancialStatementParams } from 'src/types';
import useSWR from 'swr';

export const useFinancialStatements = (params: GetFinancialStatementParams) => {
  const { data, error } = useSWR(
    ['financial-statements', JSON.stringify(params)],
    async () => {
      return financialStatementService.getList(params);
    },
    { revalidateOnFocus: false },
  );

  return {
    ...data,
    loading: !data && !error,
  };
};
