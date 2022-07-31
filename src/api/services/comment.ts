import {
  CreateComment,
  GetCommentsParams,
  GetCommentsResponse,
} from 'src/types';
import { coreClient } from '../client';

export const commentService = {
  getComments: async (
    params: GetCommentsParams,
  ): Promise<GetCommentsResponse> => {
    const res = await coreClient.get('/comments', { params });
    return res.data.data;
  },

  createComment: async (data: CreateComment): Promise<void> => {
    await coreClient.post('/comments', { ...data, userId: 1 });
  },
};
