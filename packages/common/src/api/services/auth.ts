import {
  ForgetPasswordReq,
  LoginReq,
  ResendMailReq,
  ResetPasswordReq,
  SignupReq,
  Tokens,
  VerifyUser,
} from 'src/types';
import { getAxios } from '../client';

export const authApi = {
  login: async (data: LoginReq): Promise<Tokens> => {
    const axios = getAxios();
    const res = await axios.post('/auth/login', data);
    return res.data;
  },

  signup: async (data: SignupReq): Promise<void> => {
    const axios = getAxios();
    axios.post('/auth/signup', data);
  },

  resendMail: async (params: ResendMailReq): Promise<void> => {
    const axios = getAxios();
    axios.get('/auth/resend-mail', { params });
  },

  verifyUser: async (params: VerifyUser): Promise<void> => {
    const axios = getAxios();
    axios.get('/auth/verify', { params });
  },

  logout: async (): Promise<void> => {
    const axios = getAxios();
    axios.get('/auth/logout');
  },

  forgetPassword: async (data: ForgetPasswordReq): Promise<void> => {
    const axios = getAxios();
    axios.post('/auth/forget-password', data);
  },

  resetPassword: async (
    params: ResetPasswordReq,
    data: ResetPasswordReq,
  ): Promise<void> => {
    const axios = getAxios();
    axios.post('/auth/reset-password', data, { params });
  },

  loginFB: async (accessToken: string): Promise<Tokens> => {
    const axios = getAxios();
    const res = await axios.get('/auth/facebook', {
      params: { access_token: accessToken },
    });
    return res.data;
  },

  loginGoogle: async (accessToken: string): Promise<Tokens> => {
    const axios = getAxios();
    const res = await axios.get('/auth/google', {
      params: { access_token: accessToken },
    });
    return res.data;
  },
};
