export interface FinancialIndex {
  id: number;
  name: string;
  value: number;
  year: number;
}

export interface GetFinancialIndexesParams {
  companyId: number;
}

export interface GetFinancialIndexesReponse {
  financialIndexes: FinancialIndex[];
}
