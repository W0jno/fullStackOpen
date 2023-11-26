import { useState } from "react"
import {DiaryFormProps, Visibility, VisibilityOption, Weather, WeatherOption} from "../types"
import { createNewDiaryEntry } from "../service/diaryService"
function DiaryForm(props: DiaryFormProps) : JSX.Element {
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState('')
    const [weather, setWeather] = useState('')
    const [comment, setComment] = useState('')
    const diaryCreation = (event: React.SyntheticEvent) =>{
      event.preventDefault()
      createNewDiaryEntry({date: date, visibility: visibility, weather: weather, comment:comment}).then(data=> props.setDiary(props.diary.concat(data)))
        
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
  }
  const weatherOptions: WeatherOption[] = Object.values(Weather).map(v => ({
    value: v,
    label: v.toString()
  }))

  const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(v => ({
    value: v,
    label: v.toString()
  }))
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
          
         {visibilityOptions.map((v, index) => (
      <div key={index}>
        <input type='radio' value={v.value} checked={visibility === v.value} onChange={() => setVisibility(v.value)} />
        <label>{v.label}</label>
      </div>
    ))}
        </div>
        <div>
          Weather
          {weatherOptions.map((v, index) => (
      <div key={index} >
        <input type='radio' value={v.value} checked={weather === v.value} onChange={() => setWeather(v.value)} />
        <label>{v.label}</label>
      </div>
    ))}
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