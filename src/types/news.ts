import { BaseParams, PaginationResponse } from './api';

export interface News {
  newsId: number;
  title: string;
  time: string;
  path: string;
  symbol: string;
  content?: string;
}

export interface GetNewsParams extends BaseParams {
  companyId?: number;
}

export interface GetFavoriteNewsParams extends BaseParams {}

export interface GetNewsResponse extends PaginationResponse {
  news: News[];
}
