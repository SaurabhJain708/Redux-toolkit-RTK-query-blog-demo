import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useToggle from '../Hooks/useToggle';

const Login = () => {
  const { setAuth } = useAuth();
  const errRef = useRef();
  const userRef = useRef();
  const [err, setErr] = useState("");
  const navigate = useNavigate()
  const [value, toggle] = useToggle('persist',false)
  const location = useLocation()
  const from = location.state?.from?.pathname ||"/"
  const [response, setResponse] = useState({
    email: '',
    password: '',
    roles: ''
  });

  const handleonchange = (e) => {
    const { name, value } = e.target;
    setResponse((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleonsubmit = async (e) => {
    e.preventDefault();
    try {
      const apiRes = await axios.post('Login_Url', JSON.stringify(response),
        {
          headers: { 'Content-Type': "application/json" },
          withCredentials: true
        });
      setAuth({ user: true, ...response, roles: ['user', response.roles || "null"], accesstoken: apiRes.accesstoken });
      setResponse({
        email: '',
        password: '',
        roles: ''
      });
      navigate(from,{replace:true})
    } catch (err) {
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
      if (errRef.current) errRef.current.focus();
    }
  };

  useEffect(() => {
    setErr('');
  }, [response]);

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-dark position-relative">
      {/* Error notification positioned at the top of the page */}
      {err && (
        <div 
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
            onClick={() => setErr('')}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}

      <div className="card p-4 text-light" style={{ width: '100%', maxWidth: '400px', backgroundColor: '#2c2c2c' }}>
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">Login</h2>
          <form onSubmit={handleonsubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control bg-dark text-light border-secondary"
                id="email"
                placeholder="Enter email"
                ref={userRef}
                name="email"
                onChange={handleonchange}
                value={response.email}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary"
                id="password"
                placeholder="Enter password"
                name="password"
                onChange={handleonchange}
                value={response.password}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="roles">Roles</label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                id="roles"
                name="roles"
                placeholder="Enter roles"
                onChange={handleonchange}
                value={response.roles}
                required
              />
            </div>
            <div className="form-group form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="trustDevice"
                checked={value}
                onChange={() => toggle(!value)}
              />
              <label className="form-check-label text-light" htmlFor="trustDevice">
                Trust this device
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;