import {
  IComment,
  ICompany,
  FinancialStatement,
  INews,
  TickerPrice,
  Ticker,
  User,
  Pagination,
  Gender,
  LoginMethodEnum,
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

export const mockComments: IComment[] = Array.apply(0, new Array(10)).map(
  (_, index) => ({
    id: index + 1,
    content: 'Comment 1',
    date: new Date().toISOString(),
    user: mockUser,
  }),
);

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

export const mockCompany: ICompany = {
  companyId: 1,
  companyName: 'FPT',
  symbol: 'FPT',
  exchange: '1000',
  firstTradingDate: 10000,
  firstClosePrice: 1000000,
  firstSharesQuantity: 1000,
  introduction:
    'Công ty Cổ phần Đầu tư và Phát triển Đức Quân (FTM) có tiền thân là Công ty TNHH Dệt Đại Cường Thái Bình, được thành lập vào năm 2006. Công ty hoạt động chính trong lĩnh vực sản xuất và kinh doanh các loại sợi. Bên cạnh đó, Công ty còn kinh doanh thương mại nguyên phụ liệu ngành dệt may phục vụ các doanh nghiệp trong nước. FTM hiện đang quản lý và khai thác 03 nhà máy sợi với năng lực sản xuất lên đến 18.000 tấn sợi/năm. FTM được niêm yết và giao dịch trên Sở Giao dịch Chứng khoán Thành phố Hồ Chí Minh (HOSE) từ đầu năm 2017.',
};

export const mockPagination: Pagination = {
  currentPage: 1,
  pageSize: 20,
  totalItems: 40,
};
