import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { BACKEND } from "../App"
import Cookies from "js-cookie"

export default function User(){
    const {name} = useParams()
    const [data,setData] = useState([])
    useEffect(() => {
        fetch(BACKEND+"/user",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": Cookies.get("email") ? Cookies.get("email") : "",
                "user": name
            })
            
        })
        .then(d => d.json())
        .then(res => setData(res))
    },[])

    return(
        <div>
            <h1>{data.name}</h1>
            <h1>{data.subscribers}</h1>
        </div>
    )
}