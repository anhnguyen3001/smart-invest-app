export enum Gender {
  female = 'female',
  male = 'male',
}

export enum LoginMethodEnum {
  local = 'local',
  facebook = 'facebook',
  google = 'google',
}

export interface IUser {
  id: number;
  username: string;
  avatar: string;
  email: string;
  gender: Gender;
  phoneNumber?: string;
  method: LoginMethodEnum;
}

export interface SendEmailForgotPassword {
  email: string;
}

export interface ChangePasswordReq {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateInfoReq {
  username?: string;
  avatar?: string | null;
}
