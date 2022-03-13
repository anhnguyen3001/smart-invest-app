export interface IUser {
  id: number;
  name: string;
  avatar: string;
  email: string;
}

export interface SendEmailForgotPassword {
  email: string;
}
