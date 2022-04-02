export interface LoginReq {
  email: string;
  password: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface SignupReq {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

export enum MailEnum {
  register = 'register',
  resetPassword = 'resetPassword',
}

export interface ResendMailReq {
  type: MailEnum;
  email: string;
}

export interface VerifyUser {
  email: string;
  token: string;
}

export interface ForgetPasswordReq {
  email: string;
}

export interface ResetPasswordParams {
  email: string;
  token: string;
}

export interface ResetPasswordReq {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
