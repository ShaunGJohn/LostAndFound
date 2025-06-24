import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/axios';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-form">
          <h4 className="highlight">Create An Account</h4>
          <p>Create an account to post and track your lost items !!</p>
          <h2>Sign Up</h2>

          {error && <p className="error-msg">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" onChange={handleChange} required />
            <input name="email" placeholder="Email" onChange={handleChange} required />
            <input name="phone" placeholder="Phone" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit" className="btn-primary">Create Account</button>
          </form>

          <p className="switch-link">Already have an account? <Link to="/">Log in</Link></p>
        </div>
        <div className="auth-image">
          <img src="/images/signup.jpeg" alt="Signup" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
