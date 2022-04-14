import {
  ChangePasswordData,
  GetUserInfoResponse,
  UpdateProfileData,
} from 'src/types';
import { getAxios } from '../client';

export const userService = {
  getMe: async (): Promise<GetUserInfoResponse> => {
    const axios = getAxios();
    const res = await axios.get('/user/me');
    return res.data.data;
  },

  updateProfile: async (data: UpdateProfileData): Promise<void> => {
    const axios = getAxios();
    await axios.patch('/user/me', data);
  },

  changePassword: async (data: ChangePasswordData): Promise<void> => {
    const axios = getAxios();
    await axios.post('/user/change-password', data);
  },
};
