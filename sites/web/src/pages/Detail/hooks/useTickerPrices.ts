import {
  TickerPrice,
  TickerPricePeriod,
  tickerService,
} from '@smart-invest/common';
import { useState } from 'react';
import useSWR from 'swr';

export const useTickerPrices = (key: string, symbol?: string) => {
  const periodOptions = Object.values(TickerPricePeriod).map(
    (period) => period,
  );

  const [period, setPeriod] = useState(TickerPricePeriod['1m']);

  const { data: prices, error } = useSWR<TickerPrice[]>(
    [key, symbol, period],
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
