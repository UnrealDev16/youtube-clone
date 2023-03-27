import {useParams} from 'react-router-dom'
import { useState,useEffect } from 'react'
import { BACKEND } from '../App'

export default function Video(props:any){ 
    const { id } = useParams()
    console.log(id)
    const [notFound, setNotFound] = useState(false)
    const [vidIndex,setVidIndex] = useState(null)
    const [data,setData] = useState([])
    async function fetchData() {
        const response = await fetch(`${BACKEND}/videoinfo?id=${id}`);
        const data = await response.json();
        setData(data);
        setVidIndex(data.findIndex(obj => obj.video === id))
    }
    
    useEffect(() => {
        fetchData();
    },[vidIndex])

    console.log(vidIndex)
    console.log(data)

    if(data.length === 0){
        return <p>Loading...</p>
    }
    
    return (
        <div>
            {notFound ? (
                <p>Video not found</p>
            ) : (
                <div>
                    <video controls style={{outline: "none",overflow: "hidden",marginLeft: -10,width: "100dvw",height: "90dvh"}}>
                        <source type="video/mp4" src={`http://127.0.0.1:5000/video/${id}`} onError={() => setNotFound(true)}/>
                    </video>
                    <h3 style={{position: "relative",bottom: 15,fontWeight: 500,left: 30,fontFamily: "Segoe UI"}}>{data?.title}</h3>
                    <ChannelBar data={data} index={vidIndex}/>
                </div>
            )}
        </div>
    )
}

function ChannelBar(props){
    return(
        <div>
            <h3>{props?.data?.author}</h3>
            <p>11.3M</p>
        </div>
    )
}
