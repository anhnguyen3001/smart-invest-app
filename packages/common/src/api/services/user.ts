import { ChangePasswordReq, IUser, UpdateInfoReq } from 'src/types';
import { getAxios } from '../client';

export const userApi = {
  getMe: async (): Promise<IUser> => {
    const axios = getAxios();
    const res = await axios.get('/user/me');

    return res.data;
  },

  updateInfo: async (data: UpdateInfoReq): Promise<IUser> => {
    const axios = getAxios();
    const res = await axios.patch('/user/update-info', data);
    return res.data;
  },

  changePassword: async (data: ChangePasswordReq): Promise<void> => {
    const axios = getAxios();
    axios.post('/user/change-password', data);
  },
};
