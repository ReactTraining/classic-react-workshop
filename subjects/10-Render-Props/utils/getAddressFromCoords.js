const GoogleMapsAPI = "https://maps.googleapis.com/maps/api";

function wait(timeout, work) {
  return new Promise(resolve => {
    setTimeout(() => {
      try {
        resolve(work());
      } catch (error) {
        reject(error);
      }
    }, timeout);
  });
}

function getAddressFromCoords(latitude, longitude) {
  const url = `${GoogleMapsAPI}/geocode/json?latlng=${latitude},${longitude}`;

  return fetch(url)
    .then(res => res.json())
    .then(
      json =>
        json.status === "OVER_QUERY_LIMIT"
          ? // Wait 5s for the query limit to reset.
            wait(5000, () => getAddressFromCoords(latitude, longitude))
          : json.results[0].formatted_address
    );
}

const requiredWaitTime = 6000;
let lastCallTime = 0;
let alreadyWarned = false;
let promise = null;

function throttledGetAddressFromCoords(latitude, longitude) {
  const currentTime = Date.now();

  if (lastCallTime + requiredWaitTime < currentTime) {
    lastCallTime = currentTime;
    promise = getAddressFromCoords(latitude, longitude);
  } else if (!alreadyWarned) {
    window.alert(
      "It looks like you're calling getAddressFromCoords many times " +
        "quickly in a loop. Take a closer look at the componentDidUpdate " +
        "function in <GeoAddress>..."
    );
  }

  return promise;
}

export default throttledGetAddressFromCoords;
