import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Header from './Components/Header'
import './Components/Header.css'
import {Route,Routes,useParams} from 'react-router-dom'
import Video from './Components/Video'
import Login from './Components/Login'
import Home from './Components/Home'
import NewVideo from './Components/NewVideo'
import Sidebar from './Components/Sidebar'
import Register from './Components/Register'

export const BACKEND = "http://127.0.0.1:5000"

function App() {

  const [burgerMenu,setMenu] = useState(false)

  const toggleMenu = () => {
    setMenu(!burgerMenu);
  };

  const [data,setData] = useState([])
    async function fetchData() {
        const response = await fetch(`${BACKEND}/videos`);
        const data = await response.json();
        setData(data);
    }
    
    useEffect(() => {
        fetchData();
    },[])

  return (
    <div >
      <Header toggleMenu={toggleMenu}/>
      <br/>
      <br/>
      <div style={{position: "absolute"}}>
        {burgerMenu &&
          <Sidebar/>
        }
      </div>
      <div>
      <Routes>
        <Route path='/video/:id' element={<Video data={data}/>}/>
        <Route path='/' element={<Home data={data}/>}/>
        <Route path='/newvid' element={<NewVideo/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      </div>
    </div>
  )
}

export default App
