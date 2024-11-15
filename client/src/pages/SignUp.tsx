import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; 
import './css/Signup.css'
import VideoFile from '../assets/bookvideo.mov';
import { SIGNUP } from '../utils/mutations.ts'
import { checkPassword, validateEmail } from '../utils/helper.ts';


interface Props {
  text: string;
  speed?: number;
}

const TypingText: React.FC<Props> = ({ text, speed = 75 }) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  

  useEffect(() => {
    let index = 0;
    setDisplayedText(text.charAt(index));
    const intervalId = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prevText) => {
          const newText = prevText + text.charAt(index);
          return newText;
        });
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);
  
    return () => clearInterval(intervalId);
  }, [text, speed]);

  return (
    <h1>{displayedText}</h1>
  );
};

interface SignUpFormProps {}

const SignupForm: React.FC<SignUpFormProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');

  const [signUp, { loading }] = useMutation(SIGNUP);
  const navigate = useNavigate(); 

  const handleSignUp = async (event: React.FormEvent) => {
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
      const { data } = await signUp({ variables: { username, password, email } });
      console.log("Sign-up data:", data);

      if (data?.signup?.token) {
        localStorage.setItem('token', data.signup.token);

        // Redirect to the login page after successful sign-up
        navigate('/login');
      }
    } catch (err) {
      console.error('Sign up failed:', err);
      setFormError('Sign up failed. Please try again.');
    }
  };

  

  return (
    
    <div className="form-container">
      <div className='video-container'>
 <video className="foreground-video" autoPlay loop muted>
        <source src={VideoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

<TypingText text="Wander In, Bookworm – Glad You're Here!" speed={75} />
</div>
    <div className="form">

      <form className="form-border" onSubmit={handleSignUp}>
        <div id='username-input'>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div >
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
  
        <button id="signup-btn" type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
  
        {formError && <p style={{ color: 'red' }}> {formError}</p>}
        <div>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
      </form>
  </div>
    
    </div>
  );
}  

export default SignupForm;
