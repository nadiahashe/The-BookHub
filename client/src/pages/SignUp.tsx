import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; 
const SIGNUP_MUTATION = gql`
  mutation SignUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

interface SignUpFormProps {}

const SignUp: React.FC<SignUpFormProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION);
  const navigate = useNavigate(); 

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await signUp({ variables: { username, password } });

      if (data?.signUp?.token) {
        localStorage.setItem('token', data.signUp.token);

        // Redirect to the login page after successful sign-up
        navigate('/login');
      }
    } catch (err) {
      console.error('Sign up failed:', err);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
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
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        {error && <p style={{ color: 'red' }}>Sign up failed: {error.message}</p>}
      </form>

      <div>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default SignUp;
