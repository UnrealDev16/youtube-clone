import {useParams} from 'react-router-dom'
import { useState } from 'react'

export default function Video(){ 
    const { id } = useParams()
    const [notFound, setNotFound] = useState(false)

    return (
        <div>
            {notFound ? (
                <p>Video not found</p>
            ) : (
                <video style={{marginTop: -50,marginLeft: 20}} controls autoPlay height={700} width={"1000"}>
                    <source type="video/mp4" src={`http://127.0.0.1:5000/video/${id}`} onError={() => setNotFound(true)}/>
                </video>
            )}
        </div>
    )
}
