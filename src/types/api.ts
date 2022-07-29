// Request
export enum Sort {
  asc = 'asc',
  desc = 'desc',
}

export interface BaseParams {
  page?: number;
  pageSize?: number;
}

// Response
export interface BaseReponse<T> {
  code: string;
  message: string;
  data?: T;
  details?: object;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export interface PaginationResponse {
  pagination: Pagination;
}
