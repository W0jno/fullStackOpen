import { PartProps } from "../types"
function Part({part}: PartProps) {
  switch(part.kind) {
    case "basic":
        return (
            <p>
                <h2>{part.name} {part.exerciseCount}</h2>
                  <i>{part.description}</i> 
            </p>
        )
    case "background":
        return(
            <p>
                <h2>{part.name} {part.exerciseCount}</h2>
                  <i>{part.description}</i> 
                  <p>{part.backgroundMaterial} </p>
            </p>
        )
    case "group":
        return(
            <p>
                <h2>{part.name} {part.exerciseCount}</h2>
                 <i>{part.description}</i> 
                 <p>group project exercises {part.groupProjectCount}</p> 
            </p>
        )
  }
}

export default Part