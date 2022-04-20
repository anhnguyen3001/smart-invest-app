import {
  Gender,
  INews,
  LoginMethodEnum,
  Ticker,
  TickerPrice,
  User,
} from '@smart-invest/common';

export const mockPrice: TickerPrice = {
  date: new Date().toLocaleString(),
  adjPrice: -12000,
  openPrice: 27000,
  closePrice: 5000,
  priceChange: -12000,
  percentChange: 10,
  maxPrice: 30000,
  minPrice: 5000,
  totalVolume: 100000,
  totalValue: 20000,
};

export const mockTicker: Ticker = {
  companyId: 1,
  companyName: 'FPT',
  symbol: 'FPT',
  exchange: 'HOSE',
  lastPriceChange: 12000,
  lastClosePrice: 150000,
  lastPercentChange: 5,
};

export const mockTickers: Ticker[] = Array.apply(0, new Array(12)).map(
  (_, index) => ({
    ...mockTicker,
    companyId: index + 1,
  }),
);

const news: INews = {
  id: 1,
  title: 'Ant Design Title 1',
  image: 'https://joeschmoe.io/api/v1/random',
  description: 'News description abcxyz',
  date: new Date().toISOString(),
  link: 'https://dstock.vndirect.com.vn/',
};

export const mockNews: INews[] = Array.apply(0, new Array(5)).map(
  (_, index) => ({ ...news, id: index + 1 }),
);

export const mockUser: User = {
  avatar: 'https://joeschmoe.io/api/v1/random',
  username: `Anhnh`,
  email: 'nguyenhoanganh12000@gmail.com',
  gender: Gender.female,
  method: LoginMethodEnum.local,
};

export const tradingPrices: TickerPrice[] = [
  {
    date: new Date('2/2/2022').toISOString(),
    adjPrice: -12000,
    openPrice: 27000,
    closePrice: 5000,
    priceChange: -12000,
    percentChange: 10,
    maxPrice: 30000,
    minPrice: 5000,
    totalVolume: 100000,
    totalValue: 20000,
  },
  {
    date: new Date('3/2/2022').toISOString(),
    adjPrice: -12000,
    openPrice: 27000,
    closePrice: 5000,
    priceChange: -12000,
    percentChange: 10,
    maxPrice: 30000,
    minPrice: 5000,
    totalVolume: 100000,
    totalValue: 20000,
  },
  {
    date: new Date('4/2/2022').toISOString(),
    adjPrice: -12000,
    openPrice: 27000,
    closePrice: 5000,
    priceChange: -12000,
    percentChange: 10,
    maxPrice: 30000,
    minPrice: 5000,
    totalVolume: 100000,
    totalValue: 20000,
  },
  {
    date: new Date('5/2/2022').toISOString(),
    adjPrice: -12000,
    openPrice: 27000,
    closePrice: 5000,
    priceChange: -12000,
    percentChange: 10,
    maxPrice: 30000,
    minPrice: 5000,
    totalVolume: 100000,
    totalValue: 20000,
  },
  {
    date: '1/3/2022',
    adjPrice: -12000,
    openPrice: 27000,
    closePrice: 5000,
    priceChange: -12000,
    percentChange: 10,
    maxPrice: 30000,
    minPrice: 5000,
    totalVolume: 100000,
    totalValue: 20000,
  },
  {
    date: '4/3/2022',
    adjPrice: -12000,
    openPrice: 27000,
    closePrice: 5000,
    priceChange: -12000,
    percentChange: 10,
    maxPrice: 30000,
    minPrice: 5000,
    totalVolume: 100000,
    totalValue: 20000,
  },
];
