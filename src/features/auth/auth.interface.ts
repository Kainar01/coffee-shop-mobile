import { Franchise } from '../franchise/franchise.interface';
import { Seller } from '../seller/seller.interface';
import { User } from '../user/user.interface';

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
}

export interface AuthUser extends Pick<User, 'id' | 'username' | 'role' | 'phone'> {
  seller?: Seller;
  franchise?: Franchise;
}
