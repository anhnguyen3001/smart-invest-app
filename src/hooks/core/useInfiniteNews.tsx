import { useMemo } from 'react';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { InfiniteSearchQueryParams } from 'src/types';
import useSWRInfinite from 'swr/infinite';

export const useInfiniteNews = (params?: InfiniteSearchQueryParams) => {
  const pageSize = params?.pageSize || DEFAULT_PAGE_SIZE;
  const q = params?.q?.trim() || '';

  const { data, size, setSize, error } = useSWRInfinite(
    (index: number) => [
      `search/news?q=${q}&page=${index}&pageSize=${pageSize}`,
    ],
    async () => {
      return [];
    },
  );

  const isLoading = !data && !error;
  const isEmpty = data?.[0]?.length === 0;
  const hasMore = !(
    isEmpty || (data?.[data?.length - 1]?.length || pageSize) < pageSize
  );

  const news = useMemo(() => {
    return (
      data?.reduce((acc, curr) => {
        return [...acc, ...curr];
      }, []) || []
    );
    // eslint-disable-next-line
  }, [JSON.stringify(data)]);

  return {
    news,
    isLoading,
    isEmpty,
    hasMore,
    page: size,
    setPage: setSize,
  };
};
