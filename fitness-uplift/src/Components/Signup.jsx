import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    bio: '',
    name: '',
    hint: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { username, email, password, confirmPassword, phone_number, bio, name,hint } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const data = {
      username,
      email,
      password,
      confirmPassword,
      phone_number,
      bio,
      name,
      hint
    };
    console.log(data)
    try {
      const response = await axios.post('http://localhost:8000/auth/signup/', data);

      if (response.status === 201) {
        setSuccess('User registered successfully. Please login.');
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Registration failed.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
    
  };

  return (
    <div className="signup-container">
  <div className="signup-form-wrapper">
    <h2 className="signup-form-title">Create an Account</h2>
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="signup-form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="signup-form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="signup-form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="signup-form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="signup-form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="signup-form-group">
            <label htmlFor="hint">Hint (Optional)</label>
            <input
              type="text"
              name="hint"
              placeholder="Enter a hint to help remember your password"
              value={formData.hint}
              onChange={handleChange}
            />
          </div>
      <button type="submit" className="signup-submit-btn">Sign Up</button>
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}
    </form>
    <p className="signup-form-footer">
      Already have an account? <Link to="/login">Login</Link>
    </p>
  </div>
</div>

  );
};