export interface IUser {
  id: number;
  name: string;
  avatar: string;
  email: string;
}

export interface SendEmailForgotPassword {
  email: string;
}

export interface SetNewPassword {
  password: string;
  confirmPassword: string;
}
