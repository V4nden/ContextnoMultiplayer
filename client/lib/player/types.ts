export interface userType {
  id: string;
  color: string;
  name: string;
}

export interface playerType {
  user: { id: string; name: string; color: string };
  rank: number;
}
