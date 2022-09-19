export interface CreateStaffRequest {
  name: string;
  username: string;
  email: string;
  image?: string | null;
}

export interface GetFranshiseGroupItemsRequest {
  franchiseId: number;
  itemGroupId: number;
}
