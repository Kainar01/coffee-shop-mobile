export interface Seller {
  id: number;
  name: string;
  franchiseId: number;
  userId: number;
  image: string | null;
}

export interface WorkingTrack {
  id: number;
  sellerId: number;
  total: number | null;
  startDate: Date;
  endDate: Date | null;
}
