import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Privateroute from "../Components/Privateroute"

const Allroutes = () => {
  return (
    <Routes>
     <Route path="/" element={<Privateroute><Home/></Privateroute>}/>
     <Route  path="/login" element={<Login/>}/>
     <Route  path="/signup" element={<Signup />}/>
    </Routes>
  )
}

export default Allroutes







































