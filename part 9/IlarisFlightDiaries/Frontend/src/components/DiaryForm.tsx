import { useState } from "react"
import {DiaryFormProps} from "../types"
import { createNewDiaryEntry } from "../service/diaryService"
function DiaryForm(props: DiaryFormProps) : JSX.Element {
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState('')
    const [weather, setWeather] = useState('')
    const [comment, setComment] = useState('')
    const diaryCreation = (event: React.SyntheticEvent) =>{
      event.preventDefault()
     /*  const diaryToAdd = {
        id: props.diary.length + 1,
        date,
        visibility,
        weather,
        comment
      } */
      createNewDiaryEntry({date: date, visibility: visibility, weather: weather, comment:comment}).then(data=> props.setDiary(props.diary.concat(data)))
        
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
  }

  return (
     <>
      <h2>Add new Entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          Date
          <input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          Visibility
          <input
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div>
          Weather
          <input value={weather} onChange={(e) => setWeather(e.target.value)} />
        </div>
        <div>
          Comment
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  )
}

export default DiaryForm