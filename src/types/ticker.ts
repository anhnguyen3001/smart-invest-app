import { BaseParams, PaginationResponse, Sort } from './api';

export enum ExchangeEnum {
  upcom = 'UPCOM',
  hsx = 'HSX',
  hnx = 'HNX',
}

export interface InfiniteSearchQueryParams {
  pageSize?: number;
  q?: string;
}

export interface TickerPrice {
  date: string;
  adjPrice: number;
  closePrice: number;
  totalVolume: number;
  totalValue: number;
  priceChange: number;
  percentChange: number;
  openPrice: number;
  maxPrice: number;
  minPrice: number;
}

export interface Ticker {
  companyId: number;
  companyName: string;
  symbol: string;
  exchange: string;
  lastPercentChange: number;
  lastPriceChange: number;
  lastClosePrice: number;
}

export interface ConvertedTickerPrice extends Partial<TickerPrice> {
  ceilingPrice?: number;
  floorPrice?: number;
}

export interface Company {
  companyId: number;
  name: string;
  symbol: string;
  major: string;
  exchange: string;
  introduction: string;
  firstTradingDate: string;
  firstClosePrice: number;
  firstSharesQuantity: number;
  eps: number;
  dilutedEps: number;
  pe: number;
  bvps: number;
  listedShares: number;
  outstandingShares: number;
  marketCap: number;
  lastPercentChange: number;
  lastPriceChange: number;
  lastClosePrice: number;
  lastOpenPrice: number;
  lastMinPrice: number;
  lastMaxPrice: number;
  lastDate: string;
}

export enum TickerSortBy {
  percentChange = 'percent_change',
  totalVolume = 'total_volume',
}
export interface GetTickersParams extends BaseParams {
  search?: string;
  sort?: Sort;
  sortBy?: TickerSortBy;
  exchange?: ExchangeEnum;
}

export interface GetTickersReponse extends PaginationResponse {
  tickers: Ticker[];
}

export interface GetTickersNotFavoriteParams extends BaseParams {
  search?: string;
  listId?: number;
}

export enum TickerPricePeriod {
  '1m' = '1m',
  '1y' = '1y',
}

export interface GetTickerPriceParams {
  symbol: string;
  period: TickerPricePeriod;
}

export interface GetTickerPriceResponse {
  tickerPrices: TickerPrice[];
}

export interface GetPredictedPriceResponse {
  tickerPrices: number[];
}

export interface GetPredictedPriceParams {
  symbol: string;
}
