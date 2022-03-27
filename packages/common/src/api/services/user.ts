import { ChangePasswordReq, UpdateInfoReq } from 'src/types';
import { getAxios } from '../client';

export const userApi = {
  getMe: async () => {
    const axios = getAxios();
    const res = await axios.get('/user/me');

    return res.data;
  },

  updateInfo: async (data: UpdateInfoReq) => {
    const axios = getAxios();
    const res = await axios.patch('/user/update-info', data);
    return res.data;
  },

  changePassword: async (data: ChangePasswordReq) => {
    const axios = getAxios();
    const res = await axios.post('/user/change-password', data);
    return res.data;
  },
};
