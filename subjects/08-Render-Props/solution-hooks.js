////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a <GeoPosition> component that encapsulates the geo state and
//   watching logic and uses a render prop to pass the coordinates back to
//   the <App>
//
// Tip: If you're on a Mac, you may need to enable Location Services in order
//      for your browser to determine your current location. Open
//      System Preferences > Security & Privacy > Privacy > Location Services
//      and make sure the "Enable Location Services" box is checked.
//
// Got extra time?
//
// - Create a <GeoAddress> component that translates the geo coordinates to a
//   physical address and prints it to the screen (hint: use
//   `getAddressFromCoords(lat, lng).then(address => ...)`)
// - You should be able to compose <GeoPosition> and <GeoAddress> beneath it to
//   naturally compose both the UI and the state needed to render it
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import LoadingDots from "./LoadingDots";
import getAddressFromCoords from "./utils/getAddressFromCoords";

import { useState, useEffect } from "react";

function useGeoPosition() {
  const [/* current state */ geo, /* setState */ updateGeo] = useState(
    /* initial state */ {
      coords: {
        latitude: null,
        longitude: null
      },
      error: null
    }
  );

  useEffect(() => {
    const geoId = navigator.geolocation.watchPosition(
      position => {
        updateGeo({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
      error => {
        updateGeo({ error });
      }
    );

    return () => {
      navigator.geolocation.clearWatch(geoId);
    };
  }, []);

  return geo;
}

function useAddress(coords) {
  const [address, updateAddress] = useState(null);

  function refreshAddress() {
    updateAddress(null);

    const { latitude, longitude } = coords;

    if (latitude && longitude) {
      getAddressFromCoords(latitude, longitude).then(updateAddress);
    }
  }

  useEffect(refreshAddress, [coords.latitude, coords.longitude]);

  return address;
}

/*
const [
  // current state
  geo,
  // setState
  updateGeo
] = useState(
  // initial state
  {
    coords: {
      latitude: null,
      longitude: null
    },
    error: null
  }
);

useEffect(() => {
  // componentDidMount and/or componentDidUpdate
  return () => {
    // componentWillUnmount
  }
},
  // prop diff in componentDidUpdate
  [when, this, stuff, changes, run, it, again]
)
*/

function App() {
  const { coords, error } = useGeoPosition();
  const address = useAddress(coords);

  return (
    <div>
      <h1>Geolocation</h1>

      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        <dl>
          <dt>Latitude</dt>
          <dd>{coords.latitude || <LoadingDots />}</dd>
          <dt>Longitude</dt>
          <dd>{coords.longitude || <LoadingDots />}</dd>
        </dl>
      )}

      <marquee>
        <p>The address is {address || <LoadingDots />}</p>
      </marquee>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
