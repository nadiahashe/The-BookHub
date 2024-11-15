import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';
import LoginPic from '../assets/loginpic.png'
import { Link } from 'react-router-dom'; // Import Link for navigation
import { LOGIN } from '../utils/mutations.ts'
import { checkPassword, validateEmail } from '../utils/helper.ts';


interface LoginFormProps {}

const Login: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const [login, { loading }] = useMutation(LOGIN);
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

  setFormError('');

  if (!validateEmail(email)) {
    setFormError('Invalid email format.');
    return;
  }

  if (!checkPassword(password)) {
    setFormError('Password must be at least 8 characters long and contain letters and numbers.');
    return;
  }


    try {
      const { data } = await login({ variables: { email, password } });

      if (data?.login?.token) {
        // Store token in local storage
        localStorage.setItem('token', data.login.token);

        // Redirect to a protected route (e.g., dashboard)
        navigate('/home');
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };


  return (
    <div className='login-container'>
      
      <div className='left-grid'>
      <img src={LoginPic} alt="pic" className="side-content" />
      </div>

      <form className='right-grid' onSubmit={handleLogin}>
        <h1>The Book Hub</h1>
        <h2 >Connect. Share. Discover.</h2>
        <div className='form-input'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='form-input'>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Display error message if login fails */}
        {formError && (
          <p style={{ color: 'red' }}>
            Login failed: {formError || "Invalid credentials. Please try again."}
          </p>
        )}

        <div>
          {/* Sign Up button */}
          <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>

        </div>
      </form>
      


</div>
   
  );
};

export default Login;




