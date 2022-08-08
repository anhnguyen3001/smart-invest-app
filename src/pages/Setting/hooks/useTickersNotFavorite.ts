import { tickerService } from 'src/api';
import { GetTickersNotFavoriteParams } from 'src/types';
import useSWR from 'swr';

export const useTickersNotFavorite = (
  params: GetTickersNotFavoriteParams,
  shouldFetch = true,
) => {
  const { data, error, mutate } = useSWR(
    params?.listId && shouldFetch
      ? ['new-ticker-favorite', JSON.stringify(params)]
      : null,
    () => {
      return tickerService.getTickersNotFavorite(params);
    },
  );

  return { ...data, loading: !data && !error, mutate };
};
