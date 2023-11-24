import { useEffect, useState } from "react"
import {NewDiaryEntry} from "../../Backend/src/types"
import Content from "./components/Content"
import DiaryForm from "./components/DiaryForm"
import { getAllDiaryEntries } from "./service/diaryService"
function App() {
  const [diary, setDiary] = useState<NewDiaryEntry[]>([])
  useEffect(() => {
    getAllDiaryEntries().then(data=>setDiary(data))
   
  }, [])

  
  
  return (
  <>   
    <DiaryForm setDiary={setDiary} diary={diary}/>       
    <Content diary={diary}/>
  </>
  )
}

export default App
