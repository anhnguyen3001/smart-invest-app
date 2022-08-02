import useSWR from 'swr';
import { GetFavoriteListsParams } from 'src/types';
import { favoriteListService } from 'src/api/services/favoriteList';
import { mockPagination } from 'src/mock';

export const useFavoriteLists = (params: GetFavoriteListsParams) => {
  const { data, error, mutate } = useSWR(
    ['favorite-lists', JSON.stringify({ pageSize: 10, page: 1, ...params })],
    () => {
      return favoriteListService.getLists(params);
    },
    { revalidateOnFocus: false },
  );

  return { ...data, loading: !data && !error, mutate };
};
