import { Ticker } from '@smart-invest/common';
import { Pagination } from '@smart-invest/common';
import {
  GetTickersParams,
  GetTickersReponse,
  tickerService,
} from '@smart-invest/common';
import useSWR from 'swr';

export const useTickers = (
  params: GetTickersParams,
  isAllowFetchData: boolean = true,
) => {
  const { data, error } = useSWR<GetTickersReponse>(
    ['tickers', JSON.stringify(params)],
    async () => {
      if (!isAllowFetchData) return {};

      const res = await tickerService.getTickers(params);
      return res;
    },
  );

  const isLoading = !data && !error;

  return {
    isLoading,
    tickers: data?.tickers as Ticker[],
    pagination: data?.pagination as Pagination,
  };
};
