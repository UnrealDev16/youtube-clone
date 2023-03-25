import { useState } from 'react'
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

function App() {

  const [burgerMenu,setMenu] = useState(false)

  const toggleMenu = () => {
    setMenu(!burgerMenu);
  };

  return (
    <div>
      <Header toggleMenu={toggleMenu}/>
      <br/>
      <br/>
      {burgerMenu &&
        <Sidebar/>
      }
      <Routes>
        <Route path='/video/:id' element={<Video/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/newvid' element={<NewVideo/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
