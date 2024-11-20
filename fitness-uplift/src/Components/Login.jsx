import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [hint, setHint] = useState(null); 
  const [showHint, setShowHint] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login/', { email, password });

      if (response.status === 200) {
        const { access, refresh, user } = response.data;
        localStorage.setItem('accessToken', access);  // Store access token
        localStorage.setItem('refreshToken', refresh); // Store refresh token
        localStorage.setItem('userData', JSON.stringify(user));  // Store user data in localStorage

        navigate('/');  // Redirect to profile page after successful login
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const fetchHint = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/auth/hint/?email=${email}`);
      setHint(response.data.hint); 
      setShowHint(true);
    } catch (err) {
      setError('Unable to fetch hint. Make sure you enter a valid email.');
    }
  };

  return (
    <div className="login-container" id='login'>
      <div className="login-form-wrapper">
        <h2 className="login-form-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-submit-btn">Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>

        <div className="hint-section">
          <p onClick={fetchHint} className="hint-text">Forgot your password hint? Click here</p>
          {showHint && <p className="hint-display">Hint: {hint}</p>}
        </div>

        <div className="login-form-footer">
          <p>Don't have an account? <a href="/signup">Sign up here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
