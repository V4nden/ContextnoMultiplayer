export interface gameType {
  id: string;
  name: string;
  type: string;
}
export interface gameHistotyType {
  tries: number;
  words: { word: string; rank: number }[];
}
export interface submitWordResponse {
  completed: boolean;
  details: string;
  error: boolean;
  rank: number;
  tips: number;
  tries: number;
  word: string;
}
