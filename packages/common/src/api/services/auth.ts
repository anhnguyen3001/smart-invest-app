import { LoginReq, ResendMailReq, SignupReq, VerifyUser } from 'src/types';
import { getAxios } from '../client';

export const authApi = {
  login: async (data: LoginReq) => {
    const axios = getAxios();
    const res = await axios.post('/auth/login', data);
    return res.data;
  },

  signup: async (data: SignupReq) => {
    const axios = getAxios();
    const res = await axios.post('/auth/signup', data);
    return res.data;
  },

  resendMail: async (params: ResendMailReq) => {
    const axios = getAxios();
    const res = await axios.get('/auth/resend-mail', { params });
    return res.data;
  },

  verifyUser: async (params: VerifyUser) => {
    const axios = getAxios();
    const res = await axios.get('/auth/verify', { params });
    return res.data;
  },

  logout: async () => {
    const axios = getAxios();
    const res = await axios.get('/auth/logout');
    return res.data;
  },
};
