const GoogleMapsAPI = "https://maps.googleapis.com/maps/api";

const getAddressFromCoords = (latitude, longitude) => {
  const url = `${GoogleMapsAPI}/geocode/json?latlng=${latitude},${longitude}`;

  return fetch(url)
    .then(res => res.json())
    .then(json => json.results[0].formatted_address);
};

const maxCallsPerMinute = 20;
let lastCallTime = 0;
let lastWarningTime = 0;
let promise = Promise.resolve();

const throttledGetAddressFromCoords = (latitude, longitude) => {
  const currentTime = Date.now();
  const requiredWaitTime = 60000 / maxCallsPerMinute;

  if (lastCallTime + requiredWaitTime < currentTime) {
    lastCallTime = currentTime;
    promise = getAddressFromCoords(latitude, longitude);
  } else if (currentTime - lastWarningTime > 5000) {
    lastWarningTime = currentTime;
    window.alert(
      "It looks like you're calling getAddressFromCoords many times " +
        "quickly in a loop. Take a closer look at the componentDidUpdate " +
        "function in <GeoAddress>..."
    );
  }

  return promise;
};

export default throttledGetAddressFromCoords;
