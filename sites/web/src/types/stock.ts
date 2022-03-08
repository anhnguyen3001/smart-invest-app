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

export interface IStock extends IPrice {
  id: number;
  name: string;
  company: string;
}

export interface ConvertedStock extends IStock {
  ceilingPrice: number;
  floorPrice: number;
}

export interface IOHLC {
  openPrice: number;
  highPrice: number;
  lơPrice: number;
  closePrice: number;
  date: string;
}

export interface IPaper {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
}

enum FinancialInfo {
  totalAssets = "totalAssets",
}
export type IFinancialInfo = {
  [key in FinancialInfo]: number[];
} & {
  date: string[];
};

export interface ConvertedFinancialIfo extends IStock {
  ceilingPrice: number;
  floorPrice: number;
}

export interface IReport {
  id: number;
  name: string;
  link: string;
  time: string;
}
