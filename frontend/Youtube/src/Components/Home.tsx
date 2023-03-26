import VideoCard from "./VideoCard";
import { useState,useEffect } from "react";
import { BACKEND } from "../App";

export default function Home(){

    const [data,setData] = useState([])
    async function fetchData() {
        const response = await fetch(`${BACKEND}/videos`);
        const data = await response.json();
        setData(data);
    }
    
    useEffect(() => {
        fetchData();
    },[])


    return(
        <div style={{marginLeft:10,display:"flex",flexWrap: 'wrap'}}>
            <VideoCard thumbnail={data[0]?.thumbnail} to={data[0]?.video} duration={data[0]?.duration} title={data[0]?.title} author={data[0]?.author}/>
        </div>
    )
}