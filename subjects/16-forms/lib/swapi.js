import { getJSON } from './xhr'

const SWAPI = 'http://swapi.co/api'

export function getFilms(cb) {
  getJSON(`${SWAPI}/films/`, (err, data) => cb(err, data.results))
}

export function getPeople(filmURL, cb) {
  getJSON(filmURL, (err, film) => {
    const characters = film.characters.slice(0, 5)
    let data = []
    characters.forEach((url) => {
      getJSON(url, (err, person) => {
        data.push(person)
        if (data.length === characters.length) {
          cb(null, data)
        }
      })
    })
  })
}

export function getVehicles(personURL, cb) {
  getJSON(personURL, (err, person) => {
    const vehicles = person.vehicles.slice(0, 5)
    let data = []
    if (person.vehicles.length === 0) {
      cb(null, data)
    } else {
      vehicles.forEach((url) => {
        getJSON(url, (err, vehicle) => {
          data.push(vehicle)
          if (data.length === vehicles.length) {
            cb(null, data)
          }
        })
      })
    }
  })
}


