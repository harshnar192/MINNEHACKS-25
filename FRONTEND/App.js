import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './index.js';
import MapPage from './MapPageView.js';
import CreateWaypoint from './CreateWaypoint';

const App = () => {
  const [userName, setUserName] = useState('');

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-waypoint" element={<CreateWaypoint />} />
        {/* ...other routes... */}
      </Routes>
    </div>
  );
};

export default App;
