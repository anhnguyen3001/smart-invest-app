import { IUser } from './user';

export interface IPrice {
  closePrice: number;
  openPrice: number;
  maxPrice: number;
  minPrice: number;
  priceChange: number;
  percentChange: number;
  totalVolume: number;
  totalValue: number;
  adjPrice: number;
  date: string;
}

export interface ITicker extends IPrice {
  companyId: number;
  companyName: string;
  symbol: string;
  exchange: string;
}

export interface ConvertedTicker extends ITicker {
  ceilingPrice: number;
  floorPrice: number;
}

export interface IOHLC {
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  date: string;
}

export interface ICompany {
  companyId: number;
  companyName: string;
  // Stock code
  symbol: string;
  exchange: string;
  introduction: string;
  firstTradingDate: number;
  firstClosePrice: number;
  firstSharesQuantity: number;
}

export interface IFinancialStatement {
  id: number;
  name: string;
  period: string;
  path: string;
}

export interface INews {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
}

export interface IComment {
  id: number;
  content: string;
  user: IUser;
  date: string;
}
