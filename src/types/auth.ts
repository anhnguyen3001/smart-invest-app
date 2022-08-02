export interface LoginData {
  email: string;
  password: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

export interface VerifyUserData {
  email: string;
  code: string;
}

export enum MailEnum {
  verifyUser = 'verifyUser',
  resetPassword = 'resetPassword',
}

export interface ResendMailData {
  email: string;
}

export interface ForgetPasswordData {
  email: string;
}

export interface VerifyOtpParams {
  email: string;
  code: string;
}

export interface VerifyOtpResponse {
  token: string;
}

export interface ResetPasswordData {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}
