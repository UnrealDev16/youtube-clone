import VideoCard from "./VideoCard";
import { useState,useEffect } from "react";
import { BACKEND } from "../App";

export default function Home(props:any){

    return(
        <div style={{marginLeft:10,display:"flex",flexWrap: 'wrap'}}>
            <VideoCard thumbnail={props.data[0]?.thumbnail} to={props.data[0]?.video} duration={props.data[0]?.duration} title={props.data[0]?.title} author={props.data[0]?.author}/>
        </div>
    )
}