import { Franchise } from '../franchise/franchise.interface';
import { Seller, WorkingTrack } from '../seller/seller.interface';
import { User } from '../user/user.interface';

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
}

export interface AuthSeller extends Seller {
  workingTrack: WorkingTrack | null;
}

export interface AuthFranchise extends Franchise {
  isQRGenerator: boolean;
}

export interface AuthUser extends Pick<User, 'id' | 'username' | 'role' | 'phone'> {
  seller?: AuthSeller;
  franchise?: AuthFranchise;
}
