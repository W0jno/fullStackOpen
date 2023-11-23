import { DiaryProps } from "../../../Backend/src/types"
function Diary(props: DiaryProps) : JSX.Element {
    
  return (
    <>
    <p>
        Visibilisty: {props.diary.visibility}
        
    </p>
    <p>
        Date: {props.diary.date}

    </p>
    <p>
        
         Weather: {props.diary.weather}
    </p>
    <p>
        
         Comment: {props.diary.comment}
    </p>
    </>
  )
}

export default Diary