
import { ContentProps } from "../types"

function Content (props: ContentProps) : JSX.Element {
  return (
    <div>
      {props.courseParts.map((part, i) =>
        <p key={i}>
            {part.name} {part.exerciseCount}
        </p>
      )}
    </div>
  )
}

export default Content