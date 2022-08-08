import { tickerService } from 'src/api';
import { GetTickersParams, Pagination, Ticker } from 'src/types';
import useSWR from 'swr';

export const useTickers = (params: GetTickersParams) => {
  const { data, error } = useSWR(
    ['tickers', JSON.stringify(params)],
    async () => {
      return {
        tickers: [
          {
            companyId: 2087,
            companyName: 'Công ty cổ phần 32',
            symbol: 'A32',
            exchange: 'UPCOM',
            lastPercentChange: 1,
            lastPriceChange: 1.5,
            lastClosePrice: 40,
          },
          {
            companyId: 2088,
            companyName: 'Công ty cổ phần 32',
            symbol: 'AAA',
            exchange: 'UPCOM',
            lastPercentChange: 1,
            lastPriceChange: 1.5,
            lastClosePrice: 40,
          },
        ],
        pagination: {
          currentPage: 1,
          pageSize: 10,
          totalItems: 5,
        },
      };
      return await tickerService.getTickers(params);
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
