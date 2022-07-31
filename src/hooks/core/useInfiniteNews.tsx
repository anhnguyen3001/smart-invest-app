import { useMemo } from 'react';
import { newsService } from 'src/api/services/news';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { getObjFromQueryString } from 'src/helpers';
import { InfiniteSearchQueryParams } from 'src/types';
import useSWRInfinite from 'swr/infinite';

export const useInfiniteNews = (params?: InfiniteSearchQueryParams) => {
  const pageSize = params?.pageSize || DEFAULT_PAGE_SIZE;

  const { data, size, setSize, error } = useSWRInfinite(
    (index: number = 1) => ['news', `page=${index || 1}&pageSize=${pageSize}`],
    (_, params: string) => {
      return newsService.getNews(getObjFromQueryString(params)) as any;
    },
    {
      revalidateOnFocus: false,
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
        return [...acc, ...curr.news];
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
