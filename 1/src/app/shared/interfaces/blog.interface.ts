export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface IBlog {
  id: number;
  postedBy: string;
  date: Date;
  topic: string;
  message: string;
}
