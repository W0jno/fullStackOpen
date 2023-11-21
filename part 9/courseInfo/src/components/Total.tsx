import { totalExercises } from "../types"

function Total(props: totalExercises): JSX.Element {
  return (
    <p>
        Number of exercises {props.totalExercises}
      </p>
  )
}

export default Total