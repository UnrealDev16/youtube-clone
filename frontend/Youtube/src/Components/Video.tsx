import {useParams} from 'react-router-dom'

export default function Video(){ 
    const id = useParams()
    console.log(id.id)
    return(
        <div>
            <video controls>
                <source type="video/mp4" src={`http://127.0.0.1:5000/video/${id.id}`}/>
            </video>
        </div>
    )
}