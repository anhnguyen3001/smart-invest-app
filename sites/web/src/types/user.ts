export interface IUser {
  id: number;
  name: string;
  avatar: string;
  email: string;
}

export interface IComment {
  id: number;
  content: string;
  user: IUser;
  date: string;
}
