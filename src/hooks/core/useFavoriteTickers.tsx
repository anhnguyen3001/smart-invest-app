import { favoriteTickerService } from 'src/api/services/favoriteTicker';
import { GetTickersReponse } from 'src/types';
import { GetFavoriteTickersParams } from 'src/types/favoriteTicker';
import useSWR from 'swr';

export const useFavoriteTickers = (params: GetFavoriteTickersParams = {}) => {
  const { data, error, mutate } = useSWR<GetTickersReponse>(
    ['favorite-tickers', JSON.stringify(params)],
    () => {
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
        ],
        pagination: {
          totalItems: 1,
          currentPage: 1,
          pageSize: 10,
        },
      };
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
