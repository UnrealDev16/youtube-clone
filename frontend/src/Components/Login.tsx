import { Link,useNavigate } from 'react-router-dom';
import './Register.css'
import { Button } from '@mui/material'
import { useRef, useState } from 'react'
import { BACKEND } from '../App';
import Cookies from 'js-cookie';

export default function Register() {

    const navigate = useNavigate()
    if(Cookies.get("email")){
      navigate("/")
    }

    const email = useRef(null)
    const password = useRef(null)

    const [err,setErr] = useState("")
    const [output,setOutput] = useState("")

    function handleLogin(event){
        event.preventDefault()
        if(password.current.value && email.current.value){
            setErr("")
            fetch(BACKEND+"/login",{
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    "email": email.current.value,
                    "password": password.current.value
                })
            })
            .then(d => d.json())
            .then(res => {if(res.status==="Login"){navigate("/");Cookies.set("email",res.email)};setOutput(res);setTimeout(() => {
                setOutput("")
            }, 3000);})
        }
        else{
            setErr("Invalid Inputs")
        }
    }

    return (
      <div className="center">
        <div>
          <h1 style={{textAlign: "center"}}>Login</h1>
          {err &&
            <h3>{err}</h3>
          }
          <form onSubmit={handleLogin} className='center' style={{display: "flex", flexDirection: "column" }}>
            <input required ref={email} className="inputField" type="email" placeholder="Email" />
            <br/>
            <input required ref={password} className="inputField" type="password" placeholder="Password" />
            <Button type='submit' style={{width: 202}} variant='contained'>Login</Button>
          </form>
          <div className='loginRedirectDiv'>
            <p>Don't have an account ? <Link to={"/register"}>Register</Link></p>
          </div>
          <h1>{output.status}</h1>
        </div>
      </div>
    );
  }