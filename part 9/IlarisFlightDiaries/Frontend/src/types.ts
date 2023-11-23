export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

 export interface newDiaryContent {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
} 
export interface DiaryFormProps {
  diaryCreation: (event: React.SyntheticEvent) =>void;
  dataHandler: (data: any) => void;
  
}

