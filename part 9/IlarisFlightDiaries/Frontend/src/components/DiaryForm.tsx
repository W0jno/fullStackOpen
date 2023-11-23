import { useState } from "react"
import {DiaryFormProps} from "../types"
function DiaryForm(props: DiaryFormProps) : JSX.Element {
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState('')
    const [weather, setWeather] = useState('')
    const [comment, setComment] = useState('')
    const sendData = (event: React.SyntheticEvent) =>{
        event.preventDefault()
        setDate('');
        
        setVisibility('');
        setWeather('');
        setComment('');
        const newDiaryEntry =  {
            date: date,
            visibility: visibility,
            weather: weather,
            comment: comment
        }
        props.dataHandler(newDiaryEntry)
        //props.diaryCreation(event);
    }
  return (
     <>
      <h2>Add new Entry</h2>
      <form onSubmit={sendData}>
        <div>
          Date
          <input value={date} onChange={(e) => setDate(e.target.value)} />
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