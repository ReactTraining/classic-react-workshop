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

class GeoPosition extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

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
  static propTypes = {
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    children: PropTypes.func.isRequired
  };

  state = { address: null };

  fetchAddress() {
    const { latitude, longitude } = this.props;

    if (latitude && longitude) {
      getAddressFromCoords(latitude, longitude).then(address => {
        this.setState({ address });
      });
    }
  }

  componentDidMount() {
    this.fetchAddress();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.longitude !== this.props.longitude ||
      prevProps.latitude !== this.props.latitude
    ) {
      this.fetchAddress();
    }
  }

  render() {
    return this.props.children(this.state.address);
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Geolocation</h1>

        <h2>GeoPosition</h2>
        <GeoPosition>
          {state =>
            state.error ? (
              <div>Error: {state.error.message}</div>
            ) : (
              <dl>
                <dt>Latitude</dt>
                <dd>{state.coords.latitude || <LoadingDots />}</dd>
                <dt>Longitude</dt>
                <dd>{state.coords.longitude || <LoadingDots />}</dd>
              </dl>
            )
          }
        </GeoPosition>

        <h2>GeoAddress Composition</h2>
        <GeoPosition>
          {({ coords }) => (
            <GeoAddress
              latitude={coords.latitude}
              longitude={coords.longitude}
            >
              {address => <p>{address || <LoadingDots />}</p>}
            </GeoAddress>
          )}
        </GeoPosition>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
