import { useMemo } from 'react';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { mockTickers } from 'src/mock';
import { InfiniteSearchQueryParams } from 'src/types';
import useSWRInfinite from 'swr/infinite';

export const useInfiniteTickers = (params?: InfiniteSearchQueryParams) => {
  const pageSize = params?.pageSize || DEFAULT_PAGE_SIZE;
  const q = params?.q?.trim() || '';

  const {
    data,
    error,
    size = 1,
    setSize,
  } = useSWRInfinite(
    (index: number) => [
      `search/tickers?q=${q}&page=${index}&pageSize=${pageSize}`,
    ],
    async () => {
      return mockTickers;
    },
    { revalidateOnFocus: false },
  );

  const tickers = useMemo(() => {
    return (
      data?.reduce((acc, curr) => {
        return [...acc, ...curr];
      }, []) || []
    );
    // eslint-disable-next-line
  }, [JSON.stringify(data)]);

  const isLoading = !data && !error;
  const isEmpty = tickers.length === 0;
  const hasMore = !(isEmpty || (tickers.length || pageSize) < pageSize);

  return {
    tickers,
    isLoading,
    isEmpty,
    hasMore,
    page: size,
    setPage: setSize,
  };
};
