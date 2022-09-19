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

export interface WorkingTrackDayStats {
  year: number;
  month: number;
  day: number;
  total: number;
}

export interface WorkingTrackMonthStats {
  year: number;
  month: number;
  total: number;
}

export interface SellerWorkStats {
  days: Array<WorkingTrackDayStats>;
  months: Array<WorkingTrackMonthStats>;
}
