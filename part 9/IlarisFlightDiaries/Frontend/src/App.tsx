import axios from "axios"
import { useEffect, useState } from "react"
import {NewDiaryEntry} from "../../Backend/src/types"
import Content from "./components/Content"
import DiaryForm from "./components/DiaryForm"
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [diary, setDiary] = useState<NewDiaryEntry[]>([])
  const [newDiary, setNewDiary] = useState({})
  useEffect(() => {
    axios.get<NewDiaryEntry[]>('http://localhost:3000/api/diaries').then((response) => {
      setDiary(response.data as NewDiaryEntry[]);
    })
  }, [])

  const dataHandler = (data: object) =>{
    setNewDiary(data)
    console.log(newDiary)
  }
  const diaryCreation = (event: React.SyntheticEvent) =>{
    event.preventDefault()
    const diaryToAdd = {
      id: uuidv4(),
      ...newDiary,
    }
    setDiary(diary.concat(diaryToAdd));
    setNewDiary({});
  }
  return (
  <>   
    <DiaryForm dataHandler={dataHandler} diaryCreation={diaryCreation}/>       
    <Content diary={diary}/>
  </>
    
  )
}

export default App
