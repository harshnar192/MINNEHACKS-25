// Map.js
import React, { useEffect, useRef } from "react"
import { Map, View } from "ol"
import TileLayer from "ol/layer/Tile"
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import OSM from "ol/source/OSM"
import {useGeographic} from 'ol/proj.js';
import "ol/ol.css"
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

// Global variable to store markers
let globalMarkers = [];

function MapComponent() {

  const mapRef = useRef();
  useGeographic();
  const markers = useRef([]);
  const vectorSource = useRef(new VectorSource());

  useEffect(() => {
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    })

    const map = new Map({
      target: mapRef.current,
      layers: [osmLayer],
      view: new View({
        center: [-93.24, 44.97],
        zoom: 15,
      }),
    })

    const vectorLayer = new VectorLayer({
      source: vectorSource.current,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
        }),
      }),
    });

   // ...existing code...
map.on('click', function(event) {
  var coordinate = event.coordinate;
  var array = coordinate.toString().split(",").map(Number);
  var long = array[0];
  var lat = array[1];

  function getMultipleInputs() {
    let inputs = {};
    let isValid = false;

    while (!isValid) {
      // Prompt for Name
      inputs.name = prompt("Please enter the event name:");
      if (!inputs.name) {
        alert("Event name is required. Please try again.");
        continue; // Restart the loop if name is empty
      }

      // Prompt for Start Time
      inputs.startTime = prompt("Please enter start time for the event:");
      if (!inputs.startTime) {
        alert("Start time is required. Please try again.");
        continue; // Restart the loop if start time is empty
      }

      // Prompt for End Time
      inputs.endTime = prompt("Please enter end time for the event:");
      if (!inputs.endTime) {
        alert("End time is required. Please try again.");
        continue; // Restart the loop if end time is empty
      }

      // If all inputs are valid, exit the loop
      isValid = true;
    }

    return inputs;
  }

  const inputs = getMultipleInputs();
  if (inputs) {
    const marker = new Feature({
      geometry: new Point([long, lat]),
      name: inputs.name,
      startTime: inputs.startTime,
      endTime: inputs.endTime
    });

    vectorLayer.getSource().addFeature(marker);
    markers.current.push(marker);
    globalMarkers.push({ coordinates: [long, lat], name: inputs.name, startTime: inputs.startTime, endTime: inputs.endTime });

    // Save markers to local storage
    const savedMarkers = JSON.parse(localStorage.getItem('markers')) || [];
    savedMarkers.push({ coordinates: [long, lat], name: inputs.name, startTime: inputs.startTime, endTime: inputs.endTime });
    localStorage.setItem('markers', JSON.stringify(savedMarkers));
  }
});
// ...existing code...

    return () => map.setTarget(null)
  }, [])

  return (
    <div>
      <div
        style={{ height: "500px", width: "800px", margin: "50px auto" }}
        ref={mapRef}
        className="map-container"
      />
    </div>
  )
}

export default MapComponent
export { globalMarkers };