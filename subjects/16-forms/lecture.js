import React from 'react'
import { render, findDOMNode } from 'react-dom'
import serializeForm from 'form-serialize'

////////////////////////////////////////////////////////////////////////////////
// Here's a simple <form>:

const Forms = React.createClass({
  render() {
    return (
      <div>
        <h1>Forms</h1>
        <form>
          <input type="text"/>
        </form>
      </div>
    )
  }
})

render(<Forms/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Give the <input> a default value.
//const Forms = React.createClass({
//  render() {
//    return (
//      <div>
//        <h1>Forms</h1>
//        <form>
//          <input type="text" defaultValue="lol"/>
//        </form>
//      </div>
//    )
//  }
//})

////////////////////////////////////////////////////////////////////////////////
// Access the value using event.target.
//const Forms = React.createClass({
//  handleChange(event) {
//    console.log(event.target.value)
//  },
//
//  render() {
//    return (
//      <div>
//        <h1>Forms</h1>
//        <form>
//          <input type="text" defaultValue="lol" onChange={this.handleChange}/>
//        </form>
//      </div>
//    )
//  }
//})

////////////////////////////////////////////////////////////////////////////////
// Or use a ref.
//const Forms = React.createClass({
//  handleChange() {
//    console.log(
//      findDOMNode(this.refs.someInput).value
//    )
//  },
//
//  render() {
//    return (
//      <div>
//        <h1>Forms</h1>
//        <form>
//          <input ref="someInput" type="text" onChange={this.handleChange}/>
//        </form>
//      </div>
//    )
//  }
//})

////////////////////////////////////////////////////////////////////////////////
// Or you can "control" the <input> and have its value in state.
// What happens if we don't have an `onChange` but provide a value?
//const Forms = React.createClass({
//  getInitialState() {
//    return {
//      someInputValue: 'lol'
//    }
//  },
//
//  handleChange() {
//    this.setState({
//      someInputValue: findDOMNode(this.refs.someInput).value
//    })
//  },
//
//  render() {
//    return (
//      <div>
//        <h1>Forms</h1>
//        <form>
//          <input
//            ref="someInput"
//            value={this.state.someInputValue}
//            type="text"
//            onChange={this.handleChange}
//          />
//        </form>
//        <pre>{JSON.stringify(this.state, null, 2)}</pre>
//      </div>
//    )
//  }
//})

////////////////////////////////////////////////////////////////////////////////
// Some forms are transactional, so modeling in state isn't necessary, just
// use DOM APIs to access the data, like when you need to save off some data
// somewhere and reset the form, but the values in the form are never
// important to `render`.
//const Forms = React.createClass({
//  handleSubmit(event) {
//    event.preventDefault()
//    const data = serializeForm(event.target, { hash: true })
//    console.log(data)
//  },
//
//  render() {
//    return (
//      <div>
//        <h1>Forms</h1>
//        <form onSubmit={this.handleSubmit}>
//          <p>
//            <label>First Name: <input
//              name="firstName"
//              defaultValue="Ryan"
//              type="text"
//            /></label>
//          </p>
//
//          <p>
//            <label>Last Name: <input
//              name="lastName"
//              defaultValue="Florence"
//              type="text"
//            /></label>
//          </p>
//
//          <p>
//            <button type="submit">Save</button>
//          </p>
//        </form>
//      </div>
//    )
//  }
//})

////////////////////////////////////////////////////////////////////////////////
// If we did want it all in state, we don't have to link up every single
// element to state, can use <form onChange>. Updates won't be synchronized
// when other parts of the app manipulate the state.
//const Forms = React.createClass({
//  getInitialState() {
//    return {
//      firstName: 'Ryan',
//      lastName: 'Florence'
//    }
//  },
//
//  handleFormChange(event) {
//    event.preventDefault()
//    const form = findDOMNode(this.refs.form)
//    const formData = serializeForm(form, { hash: true })
//    this.setState(formData)
//  },
//
//  render() {
//    return (
//      <div>
//        <h1>Forms</h1>
//        <form ref="form" onChange={this.handleFormChange}>
//          <p>
//            <label>First Name: <input
//              name="firstName"
//              defaultValue={this.state.firstName}
//              type="text"
//            /></label>
//          </p>
//
//          <p>
//            <label>Last Name: <input
//              name="lastName"
//              defaultValue={this.state.lastName}
//              type="text"
//            /></label>
//          </p>
//
//          <p>
//            <button type="submit">Save</button>
//          </p>
//        </form>
//        <pre>{JSON.stringify(this.state, null, 2)}</pre>
//      </div>
//    )
//  }
//})

////////////////////////////////////////////////////////////////////////////////
// Use-cases are:
// 1. Transactional forms, don't need anything in state, just use
//    `defaultValue` and `onSubmit`
// 2. Some other part of the app needs the forms state to render,
//    but nothing else needs to manipulate that state (one-way),
//    use <form onChange> and DOM APIs to slurp form values into
//    state
// 3. Multiple parts of the app manipulate the state, changes need
//    to be reflected in the input (two-way), use `value` and
//    `onChange`

////////////////////////////////////////////////////////////////////////////////
// Here's a complex <form>:
//import { getFilms, getPeople, getVehicles } from './lib/swapi'
//
//const VehiclePicker = React.createClass({
//
//  getInitialState() {
//    return {
//      filmsLoading: false,
//      films: null,
//
//      peopleLoading: false,
//      people: null,
//
//      vehiclesLoading: false,
//      vehicles: null
//    }
//  },
//
//  componentDidMount() {
//    this.setState({
//      filmsLoading: true,
//      people: null,
//      vehicles: null
//    })
//    getFilms((err, films) => {
//      this.setState({ films, filmsLoading: false })
//    })
//  },
//
//  loadPeople(filmUrl) {
//    this.refs.people.value = ''
//    this.refs.vehicles.value = ''
//    this.setState({
//      peopleLoading: true,
//      vehicles: null
//    })
//    getPeople(filmUrl, (err, people) => {
//      this.setState({ people, peopleLoading: false })
//    })
//  },
//
//  loadVehicles(index) {
//    const person = this.state.people[index]
//    this.props.onPersonSelect(person)
//    this.refs.vehicles.value = ''
//    this.setState({ vehiclesLoading: true })
//    getVehicles(person.url, (err, vehicles) => {
//      this.setState({ vehicles, vehiclesLoading: false })
//    })
//  },
//
//  render() {
//    const {
//      filmsLoading,
//      films,
//      peopleLoading,
//      people,
//      vehiclesLoading,
//      vehicles
//    } = this.state
//
//    return (
//      <fieldset>
//        <legend>Vehicle</legend>
//        <p>
//          <select
//            disabled={!films}
//            onChange={(e) => this.loadPeople(e.target.value)}
//          >
//            {filmsLoading ? (
//              <option>Loading Films...</option>
//            ) : (
//              <option>- Select a Film</option>
//            )}
//            {films && (
//              films.map((film) => (
//                <option value={film.url}>{film.title}</option>
//              ))
//            )}
//          </select>
//        </p>
//
//        <p>
//          <select
//            ref="people"
//            disabled={!people || peopleLoading}
//            onChange={(e) => this.loadVehicles(e.target.value)}
//          >
//            {peopleLoading ? (
//              <option>Loading Pilots...</option>
//            ) : (
//              <option value="">- Select a Pilot</option>
//            )}
//            {people && (
//              people.map((person, index) => (
//                <option value={index}>{person.name}</option>
//              ))
//            )}
//          </select>
//        </p>
//
//        <p>
//          <select
//            ref="vehicles"
//            onChange={(e) => this.props.onSelect(e.target.value)}
//            disabled={
//              !vehicles ||
//              vehiclesLoading ||
//              peopleLoading ||
//              (vehicles && vehicles.length === 0)
//            }
//          >
//            {vehiclesLoading ? (
//              <option>Loading Vehicles...</option>
//            ) : !vehicles ? (
//              <option value="">- Select a Vehicle</option>
//            ) : (
//              vehicles.length ? (
//                vehicles.map((vehicle) => (
//                  <option value={vehicle.name}>{vehicle.name}</option>
//                ))
//              ) : (
//                <option>- No vehicles</option>
//              )
//            )}
//          </select>
//        </p>
//      </fieldset>
//    )
//  }
//})
//
//const Forms = React.createClass({
//  getInitialState() {
//    return {
//      vehicle: null
//    }
//  },
//
//  handleVehicleSelect(vehicle) {
//    this.setState({ vehicle })
//  },
//
//  render() {
//    const { vehicle } = this.state
//    return (
//      <div>
//        <h1>Awesome FORM!</h1>
//        <h2>{vehicle ? vehicle : 'No Vehicle Selected'}</h2>
//        <form>
//          <p>
//            <label>Name: <input type="text"/></label>
//          </p>
//          <VehiclePicker
//            onSelect={(vehicle) => this.handleVehicleSelect(vehicle) }
//            onPersonSelect={(person) => console.log(person.name)}
//          />
//        </form>
//      </div>
//    )
//  }
//})
