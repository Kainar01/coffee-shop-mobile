export interface Franchise {
  id: string;
  name: string;
  userId: number;
}

export interface ItemGroup {
  id: number;
  title: string;
}

export interface Item {
  id: number;
  title: string;
  unitPrice: string;
  price: string;
  itemGroupId: number;
  image: string | null;
}
