import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import MapComponent from './Map';

const CreateWaypoint = () => {
  return (
    <><div>
          <h1>Create a Waypoint</h1>
          <p>Use this page to create a new waypoint for your event.</p>
          {/* Add form or other content here */}
          <Link to="/">
            <button className="dope-button">Back to Home</button>
          </Link>
      </div>
      <MapComponent /></>
  );
};

export default CreateWaypoint;
