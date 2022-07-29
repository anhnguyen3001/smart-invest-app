import { BaseEntity } from './common';
import { User } from './user';

export interface FavoriteList extends BaseEntity {
  id: number;
  name: string;
  imageUrl?: string;
  user: User;
}
