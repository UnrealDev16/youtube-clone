import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Header from './Components/Header'
import './Components/Header.css'
import {Route,Routes,useParams} from 'react-router-dom'
import Video from './Components/Video'

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/video/:id' element={<Video/>}/>
      </Routes>
    </div>
  )
}

export default App
