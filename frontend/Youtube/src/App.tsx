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

function App() {
  return (
    <div>
      <Header/>
      <br/>
      <br/>
      <Routes>
        <Route path='/video/:id' element={<Video/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/newvid' element={<NewVideo/>}/>
      </Routes>
    </div>
  )
}

export default App
