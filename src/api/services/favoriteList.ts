import {
  UpsertFavoriteListRequest,
  UpsertFavoriteListResponse,
  GetFavoriteListsParams,
  GetFavoriteListsResponse,
} from 'src/types';
import { bffClient } from '../client';

export const favoriteListService = {
  getLists: async (
    params: GetFavoriteListsParams,
  ): Promise<GetFavoriteListsResponse> => {
    const res = await bffClient.get('/favorite-lists', {
      params,
    });
    return res.data.data;
  },
  createList: async (
    data: UpsertFavoriteListRequest,
  ): Promise<UpsertFavoriteListResponse> => {
    const res = await bffClient.post('/favorite-lists', data);
    return res.data.data;
  },
  updateList: async (
    id: number,
    data: UpsertFavoriteListRequest,
  ): Promise<UpsertFavoriteListResponse> => {
    const res = await bffClient.patch(`/favorite-lists/${id}`, data);
    return res.data.data;
  },
  getDetailList: async () => {},
};
