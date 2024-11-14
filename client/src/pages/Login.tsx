import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';
import LoginPic from '../assets/loginpic.png'
import { Link } from 'react-router-dom'; // Import Link for navigation




// Define the login mutation
const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

interface LoginFormProps {}

const Login: React.FC<LoginFormProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  

  // Handle login form submission
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await login({ variables: { username, password } });

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



  // Optional logout function to clear the token and redirect to landing page
  // const handleLogout = () => {
  //   localStorage.removeItem('token'); 
  //   navigate('/');               
  // };

  return (
    <div className='login-container'>
      
      <div className='left-grid'>
      <img src={LoginPic} alt="pic" className="side-content" />
      </div>

      <form className='right-grid' onSubmit={handleLogin}>
        <h1>The Book Hub</h1>
        <h2 >Connect. Share. Discover.</h2>
        <div className='form-input'>
          <label htmlFor="username">Username or Email</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        {error && (
          <p style={{ color: 'red' }}>
            Login failed: {error.message || "Invalid credentials. Please try again."}
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




