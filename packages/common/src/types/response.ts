import { IFinancialStatement, ITicker } from './ticker';

export interface IPagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

interface ResponseWithPagination {
  pagination: IPagination;
}

export interface SearchTickersResponse extends ResponseWithPagination {
  tickers: ITicker[];
}

export interface FinancialStatementsResponse extends ResponseWithPagination {
  financialStatements: IFinancialStatement[];
}
