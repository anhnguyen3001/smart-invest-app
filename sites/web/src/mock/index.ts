import {
  IComment,
  IFinancialStatement,
  IPaper,
  IPrice,
  ITicker,
  IUser,
} from "src/types";

export const mockPrice: IPrice = {
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

export const mockTicker: ITicker = {
  companyId: 1,
  companyName: "FPT",
  symbol: "FPT",
  exchange: "abc",
  ...mockPrice,
};

export const mockTickers: ITicker[] = Array.apply(0, new Array(5)).map(
  (_, index) => ({
    ...mockTicker,
    companyId: index + 1,
  })
);

const paper: IPaper = {
  id: 1,
  title: "Ant Design Title 1",
  image: "https://joeschmoe.io/api/v1/random",
  description: "News description abcxyz",
  date: new Date().toISOString(),
  link: "https://dstock.vndirect.com.vn/",
};

export const mockPapers: IPaper[] = Array.apply(0, new Array(5)).map(
  (_, index) => ({ ...paper, id: index + 1 })
);

export const mockUser: IUser = {
  id: 1,
  avatar: "https://joeschmoe.io/api/v1/random",
  name: `Anhnh`,
  email: "nguyenhoanganh12000@gmail.com",
};

export const mockComments: IComment[] = Array.apply(0, new Array(10)).map(
  (_, index) => ({
    id: index + 1,
    content: "Comment 1",
    date: new Date().toISOString(),
    user: mockUser,
  })
);

export const tradingPrices: IPrice[] = [
  {
    date: new Date("2/2/2022").toISOString(),
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
    date: new Date("3/2/2022").toISOString(),
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
    date: new Date("4/2/2022").toISOString(),
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
    date: new Date("5/2/2022").toISOString(),
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
    date: "1/3/2022",
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
    date: "4/3/2022",
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

export const mockReports: IFinancialStatement[] = Array.apply(
  0,
  new Array(10)
).map((_, index) => ({
  id: index + 1,
  name: "Báo cáo tài chính công ty mẹ quý 4 năm 2021",
  period: "Q4/2021",
  path: "http://images1.cafef.vn/Images/Uploaded/DuLieuDownload/2021/CTG_21Q4_BCTC_M.pdf",
}));
