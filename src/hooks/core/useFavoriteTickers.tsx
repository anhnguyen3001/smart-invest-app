import { favoriteTickerService } from 'src/api/services/favoriteTicker';
import { GetTickersReponse } from 'src/types';
import { GetFavoriteTickersParams } from 'src/types/favoriteTicker';
import useSWR from 'swr';

export const useFavoriteTickers = (
  params: GetFavoriteTickersParams = {},
  shouldFetch = true,
) => {
  const { data, error, mutate } = useSWR<GetTickersReponse>(
    shouldFetch ? ['favorite-tickers', JSON.stringify(params)] : null,
    () => {
      return favoriteTickerService.getLists({
        page: 1,
        pageSize: 10,
        ...params,
        search: params.search || undefined,
      });
    },
    { revalidateOnFocus: false },
  );

  return { ...data, loading: !data && !error, mutate };
};
