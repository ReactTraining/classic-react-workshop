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
// When it's controlled, we can set state elsewhere and it stays in sync
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
//          <button onClick={() => this.setState({ someInputValue: 'changed!' })}>
//            Change the value
//          </button>
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
// element to state, can use <form onChange>. However, updates won't be
// synchronized when other parts of the app manipulate the state like the
// button we had earlier.
//
//const Forms = React.createClass({
//
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
// Use-cases:
//
// 1. Transactional forms, don't need anything in state, just use
//    `defaultValue` and `onSubmit`
//
// 2. Some other part of the app needs the forms state to render,
//    but nothing else needs to manipulate that state (one-way),
//    use <form onChange> and DOM APIs to slurp form values into
//    state
//
// 3. Multiple parts of the app manipulate the state, changes need
//    to be reflected in the input (two-way), use `value` and
//    `onChange`

