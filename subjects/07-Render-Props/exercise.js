////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Refactor App by creating a new component named <GeoPosition>
// - <GeoPosition> should use a render prop that passes the latitude and
//   longitude to the <App>
//
// Got extra time?
//
// - Now create a <GeoAddress> component that translates the geo coordinates
//   to a physical address and prints it to the screen
// - You should be able to compose <GeoPosition> and <GeoAddress> beneath it to
//   naturally compose both the UI and the state needed to render it
// - Make sure <GeoAddress> supports the user moving positions
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import getAddressFromCoords from "./utils/getAddressFromCoords";
import LoadingDots from "./LoadingDots";

class App extends React.Component {
  state = {
    coords: {
      latitude: null,
      longitude: null
    },
    error: null
  };

  componentDidMount() {
    this.geoId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
      error => {
        this.setState({ error });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId);
  }

  render() {
    return (
      <div>
        <h1>Geolocation</h1>
        {this.state.error ? (
          <div>Error: {this.state.error.message}</div>
        ) : (
          <dl>
            <dt>Latitude</dt>
            <dd>{this.state.coords.latitude || <LoadingDots />}</dd>
            <dt>Longitude</dt>
            <dd>{this.state.coords.longitude || <LoadingDots />}</dd>
          </dl>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
