import { useParams } from "react-router-dom"

export default function User(){
    const {name} = useParams()
    return(
        <div>
            <h1>{name}</h1>
        </div>
    )
}