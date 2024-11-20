import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css'
export const Profile = () => {
  const [formData, setFormData] = useState({
    id:0,
    email: '',
    phone_number: '',
    bio: '',
    name: '',
  });
  const [username , setUsername] = useState('')
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by checking the accessToken
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login'); // Redirect to login if not logged in
    }

    const userData = JSON.parse(localStorage.getItem('userData'))
    if(userData){
      setUsername(userData.username)
    }

    // Fetch the user data on component load to populate the form
    axios.get('http://127.0.0.1:8000/auth/profile/', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      setFormData({
        id: response.data.id,
        email: response.data.email,
        phone_number: response.data.phone_number,
        bio: response.data.bio,
        name: response.data.name,
      });
    })
    .catch(error => {
      console.error('Error fetching user profile:', error);
    });
  }, [navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    try {
      const response = await axios.put('http://127.0.0.1:8000/auth/profile/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
      });
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('An error occurred while updating your profile.');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
    navigate('/'); // Redirect to login after logout
    window.location.reload()
  };

  return (
    <div className="profile-page">
      <h2>Edit Profile - {username}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};