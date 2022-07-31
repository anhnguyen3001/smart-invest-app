import { useState } from 'react';
import { tickerService } from 'src/api';
import { TickerPricePeriod } from 'src/types';
import useSWR from 'swr';

export const useTickerPrices = (key: string, symbol?: string) => {
  const periodOptions = Object.values(TickerPricePeriod).map(
    (period) => period,
  );

  const [period, setPeriod] = useState(TickerPricePeriod['1y']);

  const { data: prices, error } = useSWR(
    symbol ? [key, symbol, period] : null,
    async () => {
      if (!symbol) return;

      const res = await tickerService.getTickerPrice({ symbol, period });
      return res?.tickerPrices;
    },
    {
      revalidateOnFocus: false,
    },
  );

  return {
    prices,
    isLoading: !prices && !error,
    period,
    setPeriod,
    periodOptions,
  };
};
