////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Refactor App by creating a new component named `<GeoPosition>`
// - <GeoPosition> should use a child render callback that passes
//   to <App> the latitude and longitude state
// - When you're done, <App> should no longer have anything but
//   a render method
//
// Got extra time?
//
// - Now create a <GeoAddress> component that also uses a render
//   callback with the current address. You will use
//   `getAddressFromCoords(latitude, longitude)` to get the
//   address, it returns a promise.
// - You should be able to compose <GeoPosition> and <GeoAddress>
//   beneath it to naturally compose both the UI and the state
//   needed to render it
// - Make sure <GeoAddress> supports the user moving positions
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import getAddressFromCoords from "./utils/getAddressFromCoords";
import LoadingDots from "./LoadingDots";

class GeoPosition extends React.Component {
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
    return this.props.children(this.state);
  }
}

class GeoAddress extends React.Component {
  state = {
    address: null
  };

  componentDidMount() {
    this.doImperativeWork();
  }

  componentDidUpdate(prevProps) {
    const { latitude: prevLat, longitude: prevLong } = prevProps.coords;
    const {
      latitude: nextLat,
      longitude: nextLong
    } = this.props.coords;

    if (prevLat !== nextLat || prevLong !== nextLong) {
      this.doImperativeWork();
    }
  }

  doImperativeWork() {
    const { coords } = this.props;

    if (coords.latitude && coords.longitude) {
      getAddressFromCoords(coords.latitude, coords.longitude).then(
        address => {
          this.setState({ address });
        }
      );
    }
  }

  render() {
    return this.props.children(this.state.address);
  }
}

class App extends React.Component {
  render() {
    return (
      <GeoPosition>
        {geo => (
          <div>
            <h1>Geolocation</h1>
            {geo.error ? (
              <div>Error: {geo.error.message}</div>
            ) : (
              <div>
                <dl>
                  <dt>Latitude</dt>
                  <dd>{geo.coords.latitude || <LoadingDots />}</dd>
                  <dt>Longitude</dt>
                  <dd>{geo.coords.longitude || <LoadingDots />}</dd>
                </dl>
                <GeoAddress coords={geo.coords}>
                  {address => (
                    <marquee>
                      The address is {address || <LoadingDots />}
                    </marquee>
                  )}
                </GeoAddress>
              </div>
            )}
          </div>
        )}
      </GeoPosition>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
