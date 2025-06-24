import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="landing-navbar">
        <div className="logo">
          <img src="/images/logo.png" alt="Logo" className="logo-icon" />
          <span className="logo-text">Thing<span className="highlight">Track</span></span>
        </div>
        <div className="auth-buttons">
          <button className="btn btn-purple me-2" onClick={() => navigate('/login')}>Login</button>
          <button className="btn btn-outline-purple" onClick={() => navigate('/signup')}>Sign up</button>
        </div>
      </nav>

      <div className="landing-content text-center">
        <h1 className="headline">🔍 Worried about your lost items?</h1>
        <p className="description">
          You're not alone. <strong>ThingTrack</strong> connects finders and seekers
          to reunite you with what matters most — <em>fast, safe, and simple</em>.
        </p>
        <div className="cta-buttons mt-4">
          <button className="btn btn-purple me-3" onClick={() => navigate('/login')}>Get Started</button>
          <button className="btn btn-outline-purple" onClick={() => navigate('/about')}>Learn More</button>
        </div>
      </div>

      <img src="/images/landing-illustration.png" alt="Confused Person" className="landing-image" />
    </div>
  );
}

export default Landing;
