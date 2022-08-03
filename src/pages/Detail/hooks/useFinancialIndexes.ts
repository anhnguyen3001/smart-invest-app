import { financialIndexService, financialStatementService } from 'src/api';
import { FinancialIndex, GetFinancialIndexesParams } from 'src/types';
import useSWR from 'swr';

export const useFinancialIndexes = (params: GetFinancialIndexesParams) => {
  const { data, error } = useSWR(
    ['financial-indexes', JSON.stringify(params)],
    async () => {
      return financialIndexService.getList(params);
    },
    { revalidateOnFocus: false },
  );

  const financialIndexes = data?.financialIndexes;
  const cookData = (financialIndexes?: FinancialIndex[]) => {
    const mapping: { [key: string]: {} } = {};
    financialIndexes?.forEach(({ year, value, name }) => {
      mapping[year] = { ...(mapping[year] || {}), [name]: value };
    });
    return mapping;
  };

  return {
    cookedFinancialIndexes: cookData(financialIndexes),
    loading: !data && !error,
  };
};
