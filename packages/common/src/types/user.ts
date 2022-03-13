export enum Gender {
  female = 'female',
  male = 'male',
}

export interface IUser {
  id: number;
  name: string;
  avatar: string;
  email: string;
  gender: Gender;
}

export interface SendEmailForgotPassword {
  email: string;
}

export interface SetNewPassword {
  password: string;
  confirmPassword: string;
}
