/*eslint-disable no-alert */
////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> "submits" the form
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onChange> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
//
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import { render } from 'react-dom'

const Form = React.createClass({
  childContextTypes: {
    onFormSubmit: PropTypes.func
  },

  getChildContext() {
    return {
      onFormSubmit: this.props.onSubmit
    }
  },

  render() {
    return <div>{this.props.children}</div>
  }
})

const SubmitButton = React.createClass({
  contextTypes: {
    onFormSubmit: React.PropTypes.func
  },

  handleClick() {
    this.context.onFormSubmit()
  },

  render() {
    return <button onClick={this.handleClick}>{this.props.children}</button>
  }
})

const TextInput = React.createClass({
  contextTypes: {
    onFormSubmit: React.PropTypes.func
  },

  handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === 'Space')
      this.context.onFormSubmit()
  },

  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
        onKeyDown={this.handleKeyDown}
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
        <h1>This isn’t even my final <code>&lt;Form/&gt;</code>!</h1>

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
