////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the Form, SubmitButton, and TextInput components
// such that:
//
// - clicking the SubmitButton submits the form
// - hitting "Enter" while in a TextInput submits the form
// - Don't use a <form/> element, we're intentionally recreating the
//   browser's built in behavior
//
// Got extra time?
//
// - send the values of all the TextInput's to the Form `onChange` handler
//   without using DOM traversal APIs to get the values.
// - Implement a ResetButton that resets the TextInputs in the Form
//
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'

const Form = React.createClass({
  render() {
    return <div>{this.props.children}</div>
  }
})

const SubmitButton = React.createClass({
  render() {
    return <button>{this.props.children}</button>
  }
})

const TextInput = React.createClass({
  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
      />
    )
  }
})

const App = React.createClass({
  handleSubmit() {
    alert('YOU WIN!')
  },

  render() {
    return (
      <div>
        <h1>This isn't even my final <code>&lt;Form/&gt;</code>!</h1>

        <Form onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name"/> {' '}
            <TextInput name="lastName" placeholder="Last Name"/>
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
          </p>
        </Form>
      </div>
    )
  }
})

render(<App/>, document.getElementById('app'))
