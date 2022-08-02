import { BaseParams, PaginationResponse } from './api';
import { BaseEntity } from './common';
import { User } from './user';

export interface FavoriteList extends BaseEntity {
  id: number;
  name: string;
  imageUrl?: string;
  user: User;
}

export interface GetFavoriteListsParams extends BaseParams {
  search?: string;
}

export interface GetFavoriteListsResponse extends PaginationResponse {
  favoriteLists: FavoriteList[];
}

export interface UpsertFavoriteListRequest {
  name: string;
}

export interface UpsertFavoriteListResponse {
  id: number;
}
