export enum Roles {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  SUB_ADMIN = "sub_admin",
  CLIENT = "client",
}

export interface User {
  id: string;
  email: string;
  roles: Roles[];
  token: string;
}