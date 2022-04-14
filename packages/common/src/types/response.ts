import { IFinancialStatement, ITicker } from './ticker';

// Base response of User server
export interface UserBaseReponse<T> {
  code: string;
  message: string;
  data?: T;
  details?: object;
}

export interface IPagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

interface ResWithPagination {
  pagination: IPagination;
}

export interface SearchTickersResponse extends ResWithPagination {
  tickers: ITicker[];
}

export interface FinancialStatementsResponse extends ResWithPagination {
  financialStatements: IFinancialStatement[];
}
