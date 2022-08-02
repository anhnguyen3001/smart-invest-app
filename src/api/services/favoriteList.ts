import {
  UpsertFavoriteListRequest,
  UpsertResponse,
  GetFavoriteListsParams,
  GetFavoriteListsResponse,
  GetFavoriteListResponse,
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
  ): Promise<UpsertResponse> => {
    const res = await bffClient.post('/favorite-lists', data);
    return res.data.data;
  },
  updateList: async (
    id: number,
    data: UpsertFavoriteListRequest,
  ): Promise<UpsertResponse> => {
    const res = await bffClient.patch(`/favorite-lists/${id}`, data);
    return res.data.data;
  },
  deleteFavoriteTicker: async (
    listId: number,
    companyId: number,
  ): Promise<void> => {
    const res = await bffClient.delete(
      `/favorite-lists/${listId}/tickers/${companyId}`,
    );
    return res.data.data;
  },
  getDetailList: async (id: number): Promise<GetFavoriteListResponse> => {
    const res = await bffClient.get(`/favorite-lists/${id}`);
    return res.data.data;
  },
};
