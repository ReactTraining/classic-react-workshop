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
    const { latitude: prevLat, longitude: prevLng } = prevProps;
    const { latitude: nextLat, longitude: nextLng } = this.props;

    if (prevLat !== nextLat || prevLng !== nextLng) {
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
      <GeoPosition
        children={({ error, coords }) => (
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
                <GeoAddress
                  latitude={coords.latitude}
                  longitude={coords.longitude}
                >
                  {address => (
                    <marquee>
                      You are at {address || <LoadingDots />}
                    </marquee>
                  )}
                </GeoAddress>
              </div>
            )}
          </div>
        )}
      />
    );
  }
}

// function withGeoPosition(Component) {
//   return class extends React.Component {
//     render() {
//       return (
//         <GeoPosition>
//           {geo => <Component {...this.props} geo={geo} />}
//         </GeoPosition>
//       );
//     }
//   };
// }

// class GeoPosition extends React.Component {
//   render() {
//     const Component = this.props.Component;
//     return this.props.children(withGeoPosition(Component));
//   }
// }

ReactDOM.render(<App />, document.getElementById("app"));
