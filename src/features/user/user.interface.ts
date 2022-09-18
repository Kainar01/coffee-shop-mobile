export interface User {
  id: number;
  name: string | null;
  username: string;
  phone: string | null;
  role: UserRole | null;
}

export enum UserRole {
  ADMIN = 'admin',
}
