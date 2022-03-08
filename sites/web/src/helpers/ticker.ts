import { ConvertedTicker, ITicker } from '@ah-ticker/common';

const round2Decimal = (value: number) => {
  return Math.floor(value * 100) / 100;
};

export const convertTicker = (
  ticker: ITicker,
  stockExchangePercent: number,
): ConvertedTicker | undefined => {
  if (!ticker) return undefined;
  const { openPrice } = ticker;

  const ceilingPrice = round2Decimal(
    (openPrice / 100) * (100 + stockExchangePercent),
  );
  const floorPrice = round2Decimal(
    (openPrice / 100) * (100 + stockExchangePercent),
  );

  return {
    ...ticker,
    ceilingPrice,
    floorPrice,
  };
};

interface PriceInfo {
  price?: number;
  openPrice?: number;
  ceilingPrice?: number;
  floorPrice?: number;
}

export const getPriceColor = (priceInfo: PriceInfo) => {
  const { price, ceilingPrice, floorPrice, openPrice } = priceInfo;
  if (!price || !openPrice) return 'ceil';
  if (price === ceilingPrice) return 'ceil';
  if (price === floorPrice) return 'floor';
  if (price < openPrice) return 'error';
  if (price > openPrice) return 'success';
  return 'stock';
};
