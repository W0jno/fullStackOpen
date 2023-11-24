import axios,{AxiosError} from "axios";
import { NewDiaryEntry, DiaryEntry } from "../../../Backend/src/types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaryEntries = () =>{
    return axios.get<NewDiaryEntry[]>(baseUrl).then(res => res.data)
}

export const createNewDiaryEntry = (object: NewDiaryEntry) =>{
    
    return axios.post<DiaryEntry>(baseUrl, object).then(res => res.data)
   
}