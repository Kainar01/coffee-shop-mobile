import { ItemGroup } from 'features/admin/admin.interface';

export interface CreateFranchiseRequest {
  name: string;
  username: string;
  email: string;
}

export interface AdminItemGroup extends ItemGroup {
  items: number;
}

export interface CreateItemGroupRequest {
  title: string;
}

export interface CreateItemRequest {
  title: string;
  image: string | null;
  price: number;
  unitPrice: number;
  itemGroupId: number;
}
