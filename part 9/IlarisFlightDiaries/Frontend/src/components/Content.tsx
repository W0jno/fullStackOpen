import {ContentProps, NewDiaryEntry} from "../../../Backend/src/types"
import Diary from "./Diary"
function Content(props: ContentProps): JSX.Element {
    return (
        <>
        <h2>Diary entries</h2>
    {props.diary.map((d: NewDiaryEntry, key: number)=>(
        
        <Diary diary={d} key={key}/>
    ))}
    </>
  )
}

export default Content