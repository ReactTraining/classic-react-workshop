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
  state = { address: null };

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    const { latitude: prevLat, longitude: prevLong } = prevProps;
    const { latitude: nextLat, longitude: nextLong } = this.props;

    if (prevLat !== nextLat || prevLong !== nextLong) {
      this.fetch();
    }
  }

  fetch() {
    const { longitude, latitude } = this.props;

    if (longitude && latitude) {
      this.setState({ address: null });

      getAddressFromCoords(latitude, longitude).then(address => {
        this.setState({ address });
      });
    }
  }

  render() {
    return this.props.children(this.state.address);
  }
}

class App extends React.Component {
  render() {
    return (
      <GeoPosition
        children={state => (
          <div>
            <h1>Geolocation</h1>
            {state.error ? (
              <div>Error: {state.error.message}</div>
            ) : (
              <div>
                <dl>
                  <dt>Latitude</dt>
                  <dd>{state.coords.latitude || <LoadingDots />}</dd>
                  <dt>Longitude</dt>
                  <dd>{state.coords.longitude || <LoadingDots />}</dd>
                </dl>

                <GeoAddress
                  latitude={state.coords.latitude}
                  longitude={state.coords.longitude}
                >
                  {address => <marquee>{address}</marquee>}
                </GeoAddress>
              </div>
            )}
          </div>
        )}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
