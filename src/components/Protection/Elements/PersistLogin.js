import React, { useEffect, useState } from 'react'
import useRefreshToken from '../Hooks/useRefreshToken'
import useAuth from '../Hooks/useAuth'
import useToggle from '../Hooks/useToggle'
import { Outlet } from 'react-router-dom'

const PersistLogin = () => {
    const [auth] = useAuth()
    const [persist] = useToggle()
    const [loading,setLoading] = useState(true)
    const refresh = useRefreshToken()
    useEffect(()=>{
        const userefreshToken =async ()=>{
            try{
               await refresh()
               setLoading(true)
            }catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }
        }
        !auth.user && persist ? userefreshToken() : setLoading(false)
    },[])
  return (
    <>
    {!persist?<Outlet/>
    :loading ? <p>Loading....</p>
    : <Outlet/> }
    </>
  )
}

export default PersistLogin