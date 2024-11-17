import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import useAuth from '../Hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const {setAuth} = useAuth()
  const userref = useRef()
  const errref = useRef()
  const [checkpwd,setCheckpwd] = useState('')
  const [border,setBorder] = useState('')
  const [err,setErr] = useState('')
  const [isDisable,setisDisable] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const handleonchange = (e)=>{
    const {name,value} = e.target
    setResponse((prevState)=>({
      ...prevState,
      [name]: value
    }))
  }
  const [response,setResponse] =useState({
    email:'',
    password:'',
    roles:''
  })
  const handleoncpwdchange = (e)=>{
    setCheckpwd(e.target.value)
    if(e.target.value!==response.password){
      setBorder('is-invalid')
      setisDisable(true)
    }else if(e.target.value===response.password){
      setBorder('is-valid')
      setisDisable(false)
    }
  }
  useEffect(()=>{
    if(checkpwd===response.password){setBorder('is-valid')}
    else{setBorder('is-invalid')}
  },[response.password])
  useEffect(()=>{
    if(err) setErr('')
  },[response])

  useEffect(()=>{
    if(userref) userref.current.focus()
  },[])

  const handleonsubmit = async (e)=>{
    e.preventDefault()
    try{
      const apiresponse = await axios.post('SignUp_URL',JSON.stringify(response),
    {
      headers: { 'Content-Type': "application/json" },
      withCredentials: true
    })
    setAuth({user:true,...response,roles:['user',response.roles || 'null'], accesstoken: apiresponse.accesstoken})
    setResponse({
      email: '',
      password: '',
      roles: ''
    });
    navigate(from,{replace:true})
    }catch(err){
      if (err.response?.status === 400) {
        setErr('The request was invalid. Please check your input');
      } else if (err.response?.status === 401) {
        setErr('You must be logged in to access this resource.');
      } else if (err.response?.status === 403) {
        setErr('You do not have permission to access this resource.');
      } else if (err.response?.status === 404) {
        setErr('The requested page could not be found. Please check the URL.');
      } else {
        setErr('An unexpected error occurred. Please try again later');
      }
      if (errref.current) errref.current.focus();
    }
  }

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-dark position-relative">
  {err && (
    <div 
    ref={errref}
      className="alert alert-danger alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x w-100 text-center"
      role="alert"
      style={{ zIndex: 9999 }}
    >
      <strong>Error!</strong> {err}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={()=>{setErr('')}}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )}
  <div className="card p-4 text-light" style={{ width: '100%', maxWidth: '400px', backgroundColor: '#2c2c2c' }}>
    <div className="card-body">
      <h2 className="card-title mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleonsubmit}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control bg-dark text-light border-secondary"
            id="email"
            placeholder="Enter your email"
            value={response.email}
            name="email"
            ref={userref}
            onChange={handleonchange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control bg-dark text-light border-secondary"
            id="password"
            value={response.password}
            name="password"
            placeholder="Create a password"
            onChange={handleonchange}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="confirmPassword">Re-enter Password</label>
          <input
            type="password"
            className={`form-control bg-dark text-light ${border} border-secondary`}
            id="confirmPassword"
            placeholder="Re-enter your password"
            value={checkpwd}
            onChange={handleoncpwdchange}
            required
          />
        </div>
        <button type="submit" className='btn btn-primary btn-block w-100' disabled={isDisable}>Sign Up</button>
      </form>
      <div className="mt-3 text-center">
        <p className="text-light">Already have an account? <a href="/login" className="text-primary">Login here</a></p>
      </div>
    </div>
  </div>
</div>

  )
}

export default SignUp
