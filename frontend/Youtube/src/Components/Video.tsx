import {useParams} from 'react-router-dom'
import { useState,useEffect } from 'react'
import { BACKEND } from '../App'
import './Video.css'
import Cookies from 'js-cookie'

export default function Video(props:any){ 
    const { id } = useParams()
    console.log(id)
    const [notFound, setNotFound] = useState(false)
    const [vidIndex,setVidIndex] = useState(null)
    const [data,setData] = useState([])
    async function fetchData(event:any) {
        event.preventDefault()
        const response = await fetch(`${BACKEND}/videoinfo`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "email": Cookies.get("email"),
                "videoName": id,
            })
        });
        const data = await response.json();
        setData(data);
        setVidIndex(data.findIndex((obj:any) => obj.video === id))
    }
    
    useEffect(() => {
        fetchData(event);
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
                    <h3 style={{position: "relative",bottom: 15,fontWeight: 500,left: 25,fontFamily: "Segoe UI"}}>{data?.title}</h3>
                    <ChannelBar data={data} index={vidIndex}/>
                </div>
            )}
        </div>
    )
}

function ChannelBar(props:any){
    return(
        <div className='channelDiv'>
            <img className='pfp' src='https://e1.pxfuel.com/desktop-wallpaper/401/499/desktop-wallpaper-mrbeast-channel-art-mrbeast-logo-thumbnail.jpg' width={45}/>
            <h4 style={{position: "relative",bottom: 24,fontWeight: 500,left: 70,fontFamily: "Segoe UI"}}>{props?.data?.author}</h4>
            <p style={{position: "relative",bottom: 45,fontSize: 12,left: 68,fontFamily: "Segoe UI"}}>1B subscribers</p>
            <button className='subBtn'>Subscribe</button>
        </div>
    )
}
