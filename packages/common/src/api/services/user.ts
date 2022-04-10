import { ChangePasswordReq, IUser, UpdateInfoReq } from 'src/types';
import { getAxios } from '../client';

export const userService = {
  getMe: async (): Promise<IUser> => {
    const axios = getAxios();
    const res = await axios.get('/user/me');
    return res.data.data;
  },

  updateInfo: async (data: UpdateInfoReq): Promise<IUser> => {
    const axios = getAxios();
    const res = await axios.patch('/user/me', data);
    return res.data.data;
  },

  changePassword: async (data: ChangePasswordReq): Promise<void> => {
    const axios = getAxios();
    axios.post('/user/change-password', data);
  },
};
