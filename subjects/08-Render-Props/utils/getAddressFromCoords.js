export default function getAddressFromCoords(lat, lng) {
  return fetch(
    `https://reacttraining.com/api/address?lat=${lat}&lng=${lng}`
  )
    .then(res => res.json())
    .then(json => {
      if (json.error) {
        throw new Error(json.error);
      } else {
        return json.address;
      }
    });
}
