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
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import LoadingDots from "./LoadingDots";
import getAddressFromCoords from "./utils/getAddressFromCoords";

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
  state = {};

  componentDidMount() {
    // console.log(this.props);
  }

  componentDidUpdate(prevProps) {
    const { latitude: lat, longitude: lng } = this.props;
    if (prevProps.latitude !== lat || prevProps.longitude !== lng) {
      console.log(lat, lng);
      getAddressFromCoords(lat, lng).then(address => {
        console.log(address);
      });
    }
  }

  render() {
    return this.props.children("123");
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <GeoPosition>
          {({ error, coords }) => {
            return (
              <Fragment>
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
              </Fragment>
            );
          }}
        </GeoPosition>
        <GeoPosition>
          {({ error, coords }) => {
            return (
              <GeoAddress {...coords}>
                {address => {
                  return <div>{address || "nope"}</div>;
                }}
              </GeoAddress>
            );
          }}
        </GeoPosition>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
