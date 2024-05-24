// export interface DiaryEntry {
//   id: number;
//   date: string;
//   weather: string;
//   visibility: string;
//   comment?: string;
// }

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}


export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stromy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>
