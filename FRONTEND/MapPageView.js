import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Map, View, Overlay } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import 'ol/ol.css';
import { useGeographic } from 'ol/proj';

const MapPageView = () => {
  const mapRef = useRef();
  const vectorSource = useRef(new VectorSource());
  useGeographic();

  const clearEvents = () => {
    vectorSource.current.clear();
    localStorage.removeItem('markers');
    window.location.reload(); // Reload the page to reflect changes
  };

  useEffect(() => {
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource.current,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
        }),
      }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [osmLayer, vectorLayer],
      view: new View({
        center: [-93.24, 44.97],
        zoom: 15,
      }),
    });

    // Load existing markers from local storage or other source
    const existingMarkers = JSON.parse(localStorage.getItem('markers')) || [];
    existingMarkers.forEach(markerData => {
      const marker = new Feature({
        geometry: new Point(markerData.coordinates),
        name: markerData.name,
      });
      vectorSource.current.addFeature(marker);

      // Create overlay for each marker
      const overlayContainer = document.createElement('div');
      overlayContainer.className = 'ol-overlay-container';
      const markerElement = document.createElement('div');
      markerElement.className = 'ol-marker';
      markerElement.innerHTML = `<p style="color:black">${markerData.name}</p>`;
      overlayContainer.appendChild(markerElement);

      const overlay = new Overlay({
        element: overlayContainer,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -50],
      });

      map.addOverlay(overlay);
      overlay.setPosition(markerData.coordinates);
    });

    return () => {
      // Save markers to local storage when leaving the page
      const markers = vectorSource.current.getFeatures().map(feature => ({
        coordinates: feature.getGeometry().getCoordinates(),
        name: feature.get('name'),
      }));
      localStorage.setItem('markers', JSON.stringify(markers));
      map.setTarget(null);
    };
  }, []);

  return (
    <div>
      <h1>EVENTS IN YOUR LOCALITY</h1>
      <div
        style={{ height: '500px', width: '800px', margin: '50px auto' }}
        ref={mapRef}
        className="map-container"
      />
      <Link to="/">
        <button className="dope-button">Back to Home</button>
      </Link>
      <button onClick={clearEvents} style={{ display: 'block', margin: '20px auto' }}>Clear All Events</button>
    </div>
  );
};

export default MapPageView;
