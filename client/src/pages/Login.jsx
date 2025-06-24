import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/axios';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

function Login() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      login(res.data.user, res.data.token);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-form">
          <h4 className="highlight">Log Here</h4>
          <p>Welcome back !!</p>
          <h2>Log In</h2>

          {error && <p className="error-msg">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <div className="forgot">
              <Link to="/forgot">Forgot Password?</Link>
            </div>
            <button type="submit" className="btn-primary">Login →</button>
          </form>

          <p className="switch-link">Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
        <div className="auth-image">
          <img src="/images/login.png" alt="Login" />
        </div>
      </div>
    </div>
  );
}

export default Login;
