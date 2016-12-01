const GoogleMapsAPI = 'https://maps.googleapis.com/maps/api'

const getAddressFromCoords = (latitude, longitude) => {
  const url = `${GoogleMapsAPI}/geocode/json?latlng=${latitude},${longitude}`

  return fetch(url).then(res => res.json()).then(json => {
    return json.results[0].formatted_address
  })
}

export default getAddressFromCoords
