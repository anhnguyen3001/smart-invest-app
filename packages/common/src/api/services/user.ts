import {
  ChangePasswordData,
  GetUserInfoResponse,
  UpdateProfileData,
} from 'src/types';
import { getBffClient } from '../client';

export const userService = {
  getMe: async (): Promise<GetUserInfoResponse> => {
    const axios = getBffClient();
    const res = await axios.get('/user/me');
    return res.data.data;
  },

  updateProfile: async (data: UpdateProfileData): Promise<void> => {
    const axios = getBffClient();
    await axios.patch('/user/me', data);
  },

  changePassword: async (data: ChangePasswordData): Promise<void> => {
    const axios = getBffClient();
    await axios.post('/user/change-password', data);
  },
};
