import React from 'react'
import useAuth from '../Hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuth = ({allowedRoles}) => {
    const {auth} = useAuth()
    const location = useLocation()
  return (
   auth?.roles?.find((role)=>allowedRoles?.includes(role))?
   <Outlet/>
   : auth?.user ? <Navigate to='/unauthorized' state={{from:location}} replace/>
   : <Navigate to='/login' state={{from:location}} replace/> 
  )
}

export default RequireAuth
