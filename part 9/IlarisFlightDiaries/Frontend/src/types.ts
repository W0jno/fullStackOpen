import { NewDiaryEntry } from "../../Backend/src/types";

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
  weather:  Weather;
  visibility: Visibility;
  comment: string;
} 
export interface DiaryFormProps {
   setDiary: React.Dispatch<React.SetStateAction<NewDiaryEntry[]>>;
   diary: NewDiaryEntry[];
  
}

export interface WeatherOption {
  value: Weather,
  label: string
}

export interface VisibilityOption {
  value: Visibility,
  label: string
}

