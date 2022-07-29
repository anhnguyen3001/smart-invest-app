import { BaseParams, PaginationResponse } from './api';

export interface FinancialStatement {
  id: number;
  name: string;
  period: string;
  path: string;
}

export interface GetFinancialStatementParams extends BaseParams {
  companyId: number;
  year?: number;
}

export interface GetFinancialStatementsReponse extends PaginationResponse {
  financialStatements: FinancialStatement[];
}
