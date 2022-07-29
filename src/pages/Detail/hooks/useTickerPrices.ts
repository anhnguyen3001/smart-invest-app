import { useState } from 'react';
import { tickerService } from 'src/api';
import { tradingPrices } from 'src/mock';
import { TickerPricePeriod } from 'src/types';
import useSWR from 'swr';

export const useTickerPrices = (key: string, symbol?: string) => {
  const periodOptions = Object.values(TickerPricePeriod).map(
    (period) => period,
  );

  const [period, setPeriod] = useState(TickerPricePeriod['1m']);

  const { data: prices, error } = useSWR(
    [key, symbol, period],
    async () => {
      if (!symbol) return;
      // return tradingPrices;
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
