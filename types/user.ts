export type LoginRequest = {
  email: string;
  password: string;
};

export interface RegisterRequest {
  username: string;
  email: string;
}

export interface User {
  username: string;
  email: string;
  avatar: string;
}
