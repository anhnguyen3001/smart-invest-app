import {
  CreateComment,
  GetCommentsParams,
  GetCommentsResponse,
} from 'src/types';
import { getCoreClient } from '../client';

export const commentService = {
  getComments: async (
    params: GetCommentsParams,
  ): Promise<GetCommentsResponse> => {
    const axios = getCoreClient();
    const res = await axios.get('/comments', { params });
    return res.data.data;
  },

  createComment: async (data: CreateComment): Promise<void> => {
    const axios = getCoreClient();
    await axios.post('/comments', { ...data, userId: 1 });
  },
};
