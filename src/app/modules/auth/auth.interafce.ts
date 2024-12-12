export interface ILoginUser {
  email: string;
  password: string;
}
export type ILoginUserResponse = {
  accessToken: string;
  user: {
    name: string;
    email: string;
    photo: string;
    role: string;
  };
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
