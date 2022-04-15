import {
  ConvertedTickerPrice,
  getExchangePercent,
  TickerPrice,
} from '@smart-invest/common';

const round2Decimal = (value: number) => {
  return Math.floor(value * 100) / 100;
};

export const convertPrice = (
  exchange?: string,
  price?: TickerPrice,
): ConvertedTickerPrice | undefined => {
  if (!price || !exchange) return price;

  const exchangePercent = getExchangePercent(exchange);
  const { openPrice } = price;

  const ceilingPrice = round2Decimal(
    (openPrice / 100) * (100 + exchangePercent),
  );
  const floorPrice = round2Decimal((openPrice / 100) * (100 + exchangePercent));

  return {
    ...price,
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
  if (price < openPrice) return 'danger';
  if (price > openPrice) return 'success';
  return undefined;
};
