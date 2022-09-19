import { Item, ItemGroup } from 'features/admin/admin.interface';
import { CartItem } from 'features/seller/views/user-cart';

export interface CreateStaffRequest {
  name: string;
  username: string;
  email: string;
  image?: string | null;
}

export interface UserPurchaseItem extends Pick<Item, 'id' | 'title' | 'price' | 'image' | 'itemGroupId'> {
  bought: number;
  isFavorite: boolean;
}

export interface UserPurchaseItems {
  favorites: Array<UserPurchaseItem>;
  mostBought: Array<UserPurchaseItem>;
}

export interface ItemGroupWithCount extends ItemGroup {
  items: number;
}

export interface PurchaseRequest {
  cartItems: Array<CartItem>;
  total: number;
  username: string;
}

export interface PurchaseStatusUpdateRequest {
  purchaseId: number;
  status: PurchaseStatus;
}

export interface Purchase {
  id: number;
  sellerId: number;
  discountAmount: number;
  profit: number;
  total: number;
  status: PurchaseStatus;
  createdAt: Date;
}

export enum PurchaseStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELED = 'canceled',
}
export interface GetFranshiseGroupItemsRequest {
  franchiseId: number;
  itemGroupId: number;
}
