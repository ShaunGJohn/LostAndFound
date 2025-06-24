
import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1>About ThingTrack</h1>
      <p><strong>ThingTrack</strong> is a platform that connects people who’ve lost something with those who found it.</p>

      <h3>How It Works</h3>
      <ul>
        <li>📌 Report your lost item</li>
        <li>🔍 Check if it matches with something found</li>
        <li>🤝 Send request & confirm ownership</li>
      </ul>

      <h3>Why Use ThingTrack?</h3>
      <p>Fast. Simple. Secure. We help bring back what matters to you.</p>

      <h3>Contact Us</h3>
      <p>Email: support@thingtrack.com</p>
    </div>
  );
}

export default About;
