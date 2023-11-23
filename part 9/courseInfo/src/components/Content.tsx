
import { ContentProps } from "../types"
import Part from "./Part"
function Content (props: ContentProps) : JSX.Element {
  return (
    <div>
      {props.courseParts.map((part, i) =>   
            <Part key={i} part={part}/>
      )}
    </div>
  )
}

export default Content