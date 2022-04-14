import {
  ForgetPasswordData,
  LoginData,
  ResendMailData,
  ResetPasswordData,
  SignupData,
  Tokens,
  VerifyOtpParams,
  VerifyOtpResponse,
  VerifyUserData,
} from 'src/types';
import { getAxios } from '../client';

export const authService = {
  login: async (data: LoginData): Promise<Tokens> => {
    const axios = getAxios();
    const res = await axios.post('/auth/login', data);
    return res.data.data;
  },

  signup: async (data: SignupData): Promise<void> => {
    const axios = getAxios();
    await axios.post('/auth/signup', data);
  },

  resendMail: async (params: ResendMailData): Promise<void> => {
    const axios = getAxios();
    await axios.get('/auth/resend-mail', { params });
  },

  verifyUser: async (params: VerifyUserData): Promise<void> => {
    const axios = getAxios();
    await axios.get('/auth/verify', { params });
  },

  logout: async (): Promise<void> => {
    const axios = getAxios();
    await axios.get('/auth/logout');
  },

  forgetPassword: async (data: ForgetPasswordData): Promise<void> => {
    const axios = getAxios();
    await axios.post('/auth/recover/init', data);
  },

  verifyOtp: async (params: VerifyOtpParams): Promise<VerifyOtpResponse> => {
    const axios = getAxios();
    const res = await axios.get('/auth/recover/code', { params });
    return res.data.data;
  },

  resetPassword: async (
    token: string,
    data: ResetPasswordData,
  ): Promise<void> => {
    const axios = getAxios();
    await axios.post('/auth/recover/password', data, {
      headers: { Authorization: token },
    });
  },

  loginFB: async (accessToken: string): Promise<Tokens> => {
    const axios = getAxios();
    const res = await axios.get('/auth/facebook', {
      params: { access_token: accessToken },
    });
    return res.data.data;
  },

  loginGoogle: async (accessToken: string): Promise<Tokens> => {
    const axios = getAxios();
    const res = await axios.get('/auth/google', {
      params: { access_token: accessToken },
    });
    return res.data.data;
  },
};
