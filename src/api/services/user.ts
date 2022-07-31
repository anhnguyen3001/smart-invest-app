import {
  ChangePasswordData,
  GetUserInfoResponse,
  UpdateProfileData,
} from 'src/types';
import { bffClient } from '../client';

export const userService = {
  getMe: async (): Promise<GetUserInfoResponse> => {
    const res = await bffClient.get('/me');
    return res.data.data;
  },

  updateProfile: async (data: UpdateProfileData): Promise<void> => {
    await bffClient.patch('/me', data);
  },

  changePassword: async (data: ChangePasswordData): Promise<void> => {
    await bffClient.post('/change-password', data);
  },
};
