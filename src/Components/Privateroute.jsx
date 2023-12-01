import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
const Privateroute = ({children}) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if(!isAuthenticated){
    return <Navigate to="/login"/>
  }
  return children
}

export default Privateroute