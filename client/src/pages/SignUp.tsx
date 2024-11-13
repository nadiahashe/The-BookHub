import { useState, ChangeEvent, FormEvent } from 'react';
import { signUp } from '../api/authAPI';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

export default function Signup() {
  const [nameIsEmpty, setNameIsEmpty] = useState(false);
  const [emailIsEmpty, setEmailIsEmpty] = useState(false); // New state for email
  const [passwordIsEmpty, setPasswordIsEmpty] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [signupData, setSignupData] = useState({
    username: '',
    email: '', // Add email field
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedSignupData = {
      ...signupData,
      [name]: value
    };
    setSignupData(updatedSignupData);
    setDisableSubmit(
      updatedSignupData.username.trim() === '' || 
      updatedSignupData.email.trim() === '' || // Check for email
      updatedSignupData.password.trim() === ''
    );
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setNameIsEmpty(value.trim() === '');
    } else if (name === 'email') {
      setEmailIsEmpty(value.trim() === ''); // Check for email
    } else if (name === 'password') {
      setPasswordIsEmpty(value.trim() === '');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the sign up API endpoint with signUpData
      const data = await signUp(signupData);
      // If sign up is successful, call Auth.login to store the token in localStorage
      Auth.login(data.token);
      navigate('/search')
    } catch (err) {
      console.error('Failed to login', err);  // Log any errors that occur during sign up
    }
  };
  return (
    <div className='container d-flex flex-column'>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <h1 className='title mb-5'>Sign Up</h1>
        <label htmlFor="username" className="form-label">Username</label>
        <input 
          type='text'
          name='username'
          value={signupData.username || ''}
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
        <label htmlFor="email" className="form-label mt-4">Email</label>
        <input 
          type='email' // Use email input type for validation
          name='email'
          value={signupData.email || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          id="email"
          className={`form-control border ${emailIsEmpty ? 'border-danger' : ''}`}
        />
        {emailIsEmpty && 
          <div className='mt-2 text-danger'>
            Email is required.
          </div>
        }
        <label className='form-label mt-4'>Password</label>
        <input 
          type='password'
          name='password'
          value={signupData.password || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          id="password"
          className={`form-control border ${passwordIsEmpty ? 'border-danger' : ''}`}
        />
        {passwordIsEmpty && 
          <div className="mt-2 text-danger">
            Password is required.
          </div>
        }
        <button disabled={disableSubmit} className="btn btn-outline-primary my-4" type='submit'>Register</button>
      </form>
    </div>
  );
}
