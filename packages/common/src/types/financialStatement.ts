import { BaseParams, PaginationResponse } from './api';

export interface FinancialStatement {
  name: 'string';
  period: 'string';
  path: 'string';
}

export interface GetFinancialStatementsParams extends BaseParams {
  companyId: number;
  year?: number;
}

export interface GetFinancialStatementsReponse extends PaginationResponse {
  financialStatements: FinancialStatement[];
}
