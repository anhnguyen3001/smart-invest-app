// Request
export enum Sort {
  asc = 'asc',
  desc = 'desc',
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
