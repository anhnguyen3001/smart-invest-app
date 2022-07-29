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
  register = 'register',
  resetPassword = 'resetPassword',
}

export interface ResendMailData {
  type: MailEnum;
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
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
