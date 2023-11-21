import { courseName } from "../types"
function Header(props: courseName): JSX.Element {
  return (
    <h1>{props.name}</h1>
  )
}

export default Header