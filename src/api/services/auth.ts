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
} from '../../types';
import { bffClient } from '../client';

export const authService = {
  login: async (data: LoginData): Promise<Tokens> => {
    const res = await bffClient.post('/auth/login', data);
    return res.data.data;
  },

  signup: async (data: SignupData): Promise<void> => {
    await bffClient.post('/auth/signup', data);
  },

  resendResetPassword: async (params: ResendMailData): Promise<void> => {
    await bffClient.get('/auth/resend/reset-password', { params });
  },

  resendVerify: async (params: ResendMailData): Promise<void> => {
    await bffClient.get('/auth/resend/verify', { params });
  },

  verifyUser: async (params: VerifyUserData): Promise<void> => {
    await bffClient.get('/auth/verify', { params });
  },

  logout: async (): Promise<void> => {
    await bffClient.get('/auth/logout');
  },

  forgetPassword: async (params: ForgetPasswordData): Promise<void> => {
    await bffClient.get('/auth/recover/init', { params });
  },

  verifyOtp: async (params: VerifyOtpParams): Promise<VerifyOtpResponse> => {
    const res = await bffClient.get('/auth/recover/code', { params });
    return res.data.data;
  },

  resetPassword: async (data: ResetPasswordData): Promise<void> => {
    await bffClient.post('/auth/recover/password', data);
  },

  loginFB: async (accessToken: string): Promise<Tokens> => {
    const res = await bffClient.get('/auth/facebook', {
      params: { access_token: accessToken },
    });
    return res.data.data;
  },

  loginGoogle: async (accessToken: string): Promise<Tokens> => {
    const res = await bffClient.get('/auth/google', {
      params: { access_token: accessToken },
    });
    return res.data.data;
  },
};
