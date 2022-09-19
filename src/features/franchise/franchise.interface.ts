import { Item } from 'features/admin/admin.interface';

export interface Franchise {
  id: number;
  name: string;
  userId: number;
}

export interface FranchiseItem extends Pick<Item, 'id' | 'title' | 'image' | 'price' | 'unitPrice'> {
  quantity: string;
}
