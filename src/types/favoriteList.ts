import { BaseParams, PaginationResponse } from './api';

export interface FavoriteList {
  id: number;
  name: string;
}

export interface GetFavoriteListsParams extends BaseParams {
  search?: string;
}

export interface GetFavoriteListsResponse extends PaginationResponse {
  favoriteLists: FavoriteList[];
}

export interface GetFavoriteListResponse {
  favoriteList: FavoriteList;
}

export interface AddFavoriteTickerResponse {}

export interface UpsertFavoriteListRequest {
  name: string;
}
