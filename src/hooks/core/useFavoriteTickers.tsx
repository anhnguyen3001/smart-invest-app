import { favoriteTickerService } from 'src/api/services/favoriteTicker';
import { GetFavoriteTickersParams } from 'src/types/favoriteTicker';
import useSWR from 'swr';

export const useFavoriteTickers = (params: GetFavoriteTickersParams = {}) => {
  const { data, error } = useSWR(
    ['favorite-tickers', JSON.stringify(params)],
    () => {
      return favoriteTickerService.getLists({
        page: 1,
        pageSize: 10,
        ...params,
      });
    },
  );

  return { ...data, loading: !data && !error };
};
