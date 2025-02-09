import React, { useEffect } from 'react';

let map;

function App() {
	useEffect(() => {
		initMap();
	}, []);

	return (
		<html>
            <head>
                <title>Simple Map</title>
                <link rel="stylesheet" type="text/css" href="./style.css" />
                <script type="module" src="./index.js"></script>
            </head>
            <body>
                <div id="map" style={{ height: '100vh', width: '100%' }}></div>
                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA8zlTIffNR9BKGVzIJzIsFZTunFJxVrSw"></script>
            </body>
        </html>
	);
}

function Event({name, address, capacity}) {
    // ...existing code...
}

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

export default App;