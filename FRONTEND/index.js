import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import index from './index.css';
import App from './App';
import Map from './Map';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateWaypoint from './CreateWaypoint';
import MapPageView from './MapPageView';
import logo from './SideQuest.jpg'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-waypoint" element={<CreateWaypoint />} />
        <Route path="/map-page-view" element={<MapPageView />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

const HomePage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/')
      .then(response => response.text())
      .then(data => setMessage(data));
  }, []);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  return (
    <>
      <img
        src={logo}
        alt="SideQuest IRL Logo"
        style={{ position: 'absolute', top: 0, left: 0 }}
        onLoad={() => console.log("Logo loaded successfully!")}
        onError={(e) => console.error("Error loading logo:", e)}
      />
      <div className="main-container">
        {!isSignedIn ? (
          <button className="sign-in-button" onClick={handleSignIn}>Sign In</button>
        ) : (
          <p>Welcome back!</p>
        )}
        <div>
          <h1>Welcome to SideQuest IRL</h1>
          <p>{message}</p>
          <p> SideQuest IRL is a location-based game that allows you to explore your city and discover new places. </p>
          <Link to="/create-waypoint">
            <button className="dope-button">Create a Waypoint</button>
          </Link>
          <Link to="/map-page-view">
            <button className="dope-button">View Events</button>
          </Link>
          <h2 className="mission-title">Our Mission</h2>
          <ul className="mission-list">
            <li>
              <span className="mission-highlight">Building Community:</span> 
              <span className="mission-text"> Bringing people together through local events.</span>
            </li>
            <li>
              <span className="mission-highlight">Event Creation:</span> 
              <span className="mission-text"> Create waypoints for various events.</span>
            </li>
            <li>
              <span className="mission-highlight">Earn Rewards:</span> 
              <span className="mission-text"> Gain XP for checking into events.</span>
            </li>
            <li>
              <span className="mission-highlight">Inclusive & Social:</span> 
              <span class="mission-text"> Encouraging social interactions.</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomePage;


