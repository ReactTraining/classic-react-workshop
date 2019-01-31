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
  const [coords, updateCoords] = useState({
    latitude: null,
    longitude: null
  });
  const [
    /* this.state */ error,
    /*this.setState*/ updateError
  ] = useState(/*state = ...*/ null);

  // useEffect(sideEffect, dependencies)
  // componentDidMount
  useEffect(() => {
    const geoId = navigator.geolocation.watchPosition(position => {
      updateCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, updateError);

    // componentWillUnmount
    return () => {
      navigator.geolocation.clearWatch(geoId);
    };
  }, []);

  return { coords, error };
}

function useAddress(latitude, longitude) {
  const [address, updateAddress] = useState(null);

  useEffect(
    () => {
      if (latitude && longitude) {
        getAddressFromCoords(latitude, longitude).then(updateAddress);
      }
    },
    [latitude, longitude]
  );

  return address;
}

function App(props) {
  const { coords, error } = useGeoPosition();
  const address = useAddress(coords.latitude, coords.longitude);

  return (
    <div>
      <h1>Geolocation</h1>
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          <dl>
            <dt>Latitude</dt>
            <dd>{coords.latitude || <LoadingDots />}</dd>
            <dt>Longitude</dt>
            <dd>{coords.longitude || <LoadingDots />}</dd>
          </dl>

          <marquee>{address || <LoadingDots />}</marquee>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
