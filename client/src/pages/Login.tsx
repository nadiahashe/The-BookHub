import { useState, FormEvent, ChangeEvent } from "react";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const [nameIsEmpty, setNameIsEmpty] = useState(false);
  const [passwordisEmpty, setPasswordIsEmpty] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };


  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setNameIsEmpty(value.trim() === '');
    }
    
    if (name === 'password') {
      setPasswordIsEmpty(value.trim() === '');
    }
  };

  const navigate = useNavigate();

  const isFormValid = () => {
    return loginData.username.trim() !== '' && loginData.password.trim() !== '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        const data = await login(loginData);
        Auth.login(data.token);
        console.log("here")
        navigate('/search');
      } catch (err) {
        console.error('Failed to login', err);
      }
    }
  };

return (
    <>
    <div className='container d-flex flex-column'>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <h1 className='mb-5'>Login</h1>
        <label htmlFor="username" className="form-label">Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          id="username"
          className={`form-control border ${nameIsEmpty ? 'border-danger' : ''}`}
        />
        {nameIsEmpty && 
        	<div className='mt-2 text-danger'>
          	Name is required.
        	</div>
        }
        <label className='form-label mt-4'>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
          id="password"
          className={`form-control border ${passwordisEmpty ? 'border-danger' : ''}`}
          onBlur={handleBlur}
        />
        {passwordisEmpty && 
        	<div className="mt-2 text-danger">
          	Password is required.
        	</div>
        }
        <button  disabled={!isFormValid()} className="loginBtn" type='submit'>Submit</button>
      </form>
      <div>
        <Link className="signupBtn" to="/signup">Sign Up</Link>
      </div>
    </div>
    </>
    
  )
};

export default Login;
