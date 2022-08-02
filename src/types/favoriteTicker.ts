import { BaseParams, PaginationResponse } from './api';
import { BaseEntity } from './common';
import { User } from './user';

export interface FavoriteTicker extends BaseEntity {
  id: number;
  name: string;
  imageUrl?: string;
  user: User;
}

export interface GetFavoriteTickersParams extends BaseParams {
  search?: string;
  listId?: number;
}

export interface AddFavoriteListRequest {
  name: string;
}
