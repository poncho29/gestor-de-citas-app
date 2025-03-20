export enum Roles {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  SUB_ADMIN = "sub_admin",
  CLIENT = "client",
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  roles: Roles[];
  token: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface IUserResponse {
  users: IUser[];
  total: number;
}

export type TCreateUser = Omit<IUser, "id" | "token" | "created_at" | "updated_at" | "deleted_at"> & {
  id?: string,
  password: string
};