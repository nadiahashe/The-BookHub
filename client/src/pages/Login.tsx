import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

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
        navigate('/dashboard');
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // Optional logout function to clear the token and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    navigate('/login');               // Redirect to login page
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
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
      </form>

      {/* Logout button for demonstration (could be elsewhere in app) */}
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>
        Logout
      </button>
    </div>
  );
};

export default Login;
