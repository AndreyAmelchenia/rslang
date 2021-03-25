export interface IUser {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
  photo: string;
}

export interface IHttpUser {
  name?: string;
  email: string;
  password: string;
}
