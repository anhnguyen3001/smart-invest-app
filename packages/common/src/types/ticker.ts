import { BaseParams, PaginationResponse, Sort } from './api';

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

export interface ConvertedTickerPrice extends TickerPrice {
  ceilingPrice?: number;
  floorPrice?: number;
}

export interface IOHLC {
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  date: string;
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
  price?: TickerPrice;
}

export interface INews {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
}

export enum TickerSortBy {
  percentChange = 'percent_change',
  totalVolume = 'totalVolume',
}
export interface GetTickersParams extends BaseParams {
  search?: string;
  sort?: Sort;
  sortBy?: TickerSortBy;
}

export interface GetTickersReponse extends PaginationResponse {
  tickers: Ticker[];
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

export interface GetPredictedPriceParams {
  symbol: string;
}
