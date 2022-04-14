export enum Gender {
  female = 'female',
  male = 'male',
}

export enum LoginMethodEnum {
  local = 'local',
  facebook = 'facebook',
  google = 'google',
}

export interface User {
  username: string;
  avatar: string;
  email: string;
  gender: Gender;
  phoneNumber?: string;
  method: LoginMethodEnum;
}

export interface GetUserInfoResponse {
  user: User;
}

export interface SendEmailForgotPasswordData {
  email: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfileData {
  username?: string;
  avatar?: string | null;
}
