import { Item } from 'features/admin/admin.interface';

export interface Franchise {
  id: number;
  name: string;
  userId: number;
}

export interface FranchiseItem extends Pick<Item, 'id' | 'title' | 'image' | 'price' | 'unitPrice'> {
  quantity: string;
}

export interface QRVerification {
  id: number;
  franchiseId: number;
  secret: string;
  dueDate: Date;
}

export interface DayPurchaseStats {
  day: number;
  month: number;
  year: number;
  total: number;
  profit: number;
}

export interface MonthPurchaseStats {
  month: number;
  year: number;
  total: number;
  profit: number;
}

export interface PurchaseStats {
  days: Array<DayPurchaseStats>;
  months: Array<MonthPurchaseStats>;
}
