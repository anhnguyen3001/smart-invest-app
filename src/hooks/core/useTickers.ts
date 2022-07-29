import { tickerService } from 'src/api';
import { GetTickersParams, Pagination, Ticker } from 'src/types';
import useSWR from 'swr';

export const useTickers = (
  params: GetTickersParams,
  isAllowFetchData: boolean = true,
) => {
  const { data, error } = useSWR(
    ['tickers', JSON.stringify(params)],
    async () => {
      if (!isAllowFetchData) return;
      return await tickerService.getTickers(params);
    },
  );

  const isLoading = !data && !error;

  return {
    isLoading,
    tickers: data?.tickers as Ticker[],
    pagination: data?.pagination as Pagination,
  };
};
