import {
  CreateComment,
  GetCommentsParams,
  GetCommentsResponse,
} from 'src/types';
import { bffClient } from '../client';

export const commentService = {
  getComments: async (
    params: GetCommentsParams,
  ): Promise<GetCommentsResponse> => {
    const res = await bffClient.get('/comments', { params });
    return res.data.data;
  },

  createComment: async (data: CreateComment): Promise<void> => {
    await bffClient.post('/comments', { ...data, userId: 1 });
  },
};
