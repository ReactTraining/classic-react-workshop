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

  updateTheAddress() {
    const { coords } = this.props;

    if (coords.latitude && coords.longitude) {
      getAddressFromCoords(coords.latitude, coords.longitude).then(
        address => this.setState({ address })
      );
    }
  }

  componentDidMount() {
    this.updateTheAddress();
  }

  componentDidUpdate(prevProps) {
    const { coords: prevCoords } = prevProps;
    const { coords: nextCoords } = this.props;

    if (
      prevCoords.latitude !== nextCoords.latitude ||
      prevCoords.longitude !== nextCoords.longitude
    ) {
      this.updateTheAddress();
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
        {({ error, coords }) => (
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

            <GeoAddress coords={coords}>
              {address => (
                <marquee>
                  The current address is {address || <LoadingDots />}
                </marquee>
              )}
            </GeoAddress>
          </div>
        )}
      </GeoPosition>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
