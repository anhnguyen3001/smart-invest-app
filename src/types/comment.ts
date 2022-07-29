import { BaseParams, PaginationResponse } from './api';
import { User } from './user';

export interface Comment {
  commentId: number;
  user: User;
  content: string;
  createdAt: number;
}

export interface GetCommentsParams extends BaseParams {
  companyId: number;
}

export interface GetCommentsResponse extends PaginationResponse {
  comments: Comment[];
}

export interface CreateComment {
  companyId: number;
  content: string;
}
