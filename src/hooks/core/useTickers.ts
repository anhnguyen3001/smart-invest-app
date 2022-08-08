import { tickerService } from 'src/api';
import { GetTickersParams, Pagination, Ticker } from 'src/types';
import useSWR from 'swr';

export const useTickers = (params: GetTickersParams) => {
  const { data, error } = useSWR(
    ['tickers', JSON.stringify(params)],
    async () => {
      return tickerService.getTickers(params);
    },
    { revalidateOnFocus: false },
  );

  const isLoading = !data && !error;

  return {
    isLoading,
    tickers: data?.tickers as Ticker[],
    pagination: data?.pagination as Pagination,
  };
};
