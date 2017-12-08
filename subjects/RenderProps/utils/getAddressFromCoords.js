import debounce from "debounce-promise"

const GoogleMapsAPI = "https://maps.googleapis.com/maps/api"

const unthrottledGetAddressFromCoords = (latitude, longitude) => {
  const url = `${GoogleMapsAPI}/geocode/json?latlng=${latitude},${
    longitude
  }`

  return fetch(url)
    .then(res => res.json())
    .then(json => json.results[0].formatted_address)
}

// Throttle requests to once per second
const getAddressFromCoords = debounce(
  unthrottledGetAddressFromCoords,
  1000
)

export default getAddressFromCoords
