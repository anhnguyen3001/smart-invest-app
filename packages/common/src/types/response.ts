import { IFinancialStatement, ITicker } from './ticker';

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
