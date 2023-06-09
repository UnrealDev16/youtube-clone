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

    const username = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const repeatPassword = useRef(null)
    const link = useRef(null)

    const [err,setErr] = useState("")
    const [output,setOutput] = useState("")

    function handleRegister(event){
        event.preventDefault()
        if(password.current.value === repeatPassword.current.value){
            setErr("")
            fetch(BACKEND+"/register",{
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    "username": username.current.value,
                    "email": email.current.value,
                    "password": password.current.value,
                    "link": link.current.value
                })
            })
            .then(d => d.json())
            .then(res => {if(res.status==="Registered"){navigate("/");Cookies.set("email",res.email)};setOutput(res);setTimeout(() => {
                setOutput("")
            }, 3000);})
        }
        else{
            setErr("Password and Repeat Password did not match")
        }
    }

    return (
      <div className="center">
        <div>
          <h1 style={{textAlign: "center"}}>Register</h1>
          {err &&
            <h3>{err}</h3>
          }
          <form onSubmit={handleRegister} className='center' style={{display: "flex", flexDirection: "column" }}>
            <input required ref={username} className="inputField" type="text" placeholder="Username" />
            <br/>
            <input required ref={email} className="inputField" type="email" placeholder="Email" />
            <br/>
            <input required ref={password} className="inputField" type="password" placeholder="Password" />
            <br/>
            <input required ref={repeatPassword} className="inputField" type="password" placeholder="Repeat Password" />
            <br/>
            <input required ref={link} className="inputField" type="text" pattern="[A-Za-z0-9]+" placeholder="Set URL for your channel"/>
            <br/>
            <Button type='submit' style={{width: 202}} variant='contained'>Register</Button>
          </form>
          <div className='loginRedirectDiv'>
            <p>Already Have an Account ? <Link to={"/login"}>Login</Link></p>
          </div>
          <h1>{output.status}</h1>
        </div>
      </div>
    );
  }