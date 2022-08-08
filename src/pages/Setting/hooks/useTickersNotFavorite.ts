import { tickerService } from 'src/api';
import { GetTickersNotFavoriteParams } from 'src/types';
import useSWR from 'swr';

export const useTickersNotFavorite = (
  listId: number,
  params: GetTickersNotFavoriteParams,
) => {
  const { data, error, mutate } = useSWR(
    listId ? ['new-ticker-favorite', listId, JSON.stringify(params)] : null,
    () => {
      return tickerService.getTickersNotFavorite(listId, params);
    },
  );

  return { ...data, loading: !data && !error, mutate };
};
