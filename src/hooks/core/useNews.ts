import { newsService } from 'src/api/services/news';
import { GetNewsParams } from 'src/types';
import useSWR from 'swr';

export const useNews = (params?: GetNewsParams) => {
  const { data, error } = useSWR(
    ['news', JSON.stringify(params)],
    () => {
      return newsService.getNews(params);
    },
    { revalidateOnFocus: false },
  );

  return {
    ...data,
    loading: !data && !error,
  };
};
