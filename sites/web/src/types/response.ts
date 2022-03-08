import { IFinancialStatement } from "./ticker";

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

interface ResponseWithPagination {
  pagination: Pagination;
}

export interface FinancialStatementsResponse extends ResponseWithPagination {
  financialStatements: IFinancialStatement[];
}
