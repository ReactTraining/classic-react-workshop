////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Implement a radio group form control with the API found in App
//
// - Clicking a <RadioOption/> should update the value of <RadioGroup/>
// - The selected <RadioOption/> should pass the correct value to RadioIcon
// - the `defaultValue` should be set on first render
//
// Got extra time?
//
// Implement a `value` prop and allow this to work like a "controlled input"
// (https://facebook.github.io/react/docs/forms.html#controlled-components)
//
// - Add a button to App whose click handler sets the radioValue state to
//   some fixed value, like 'tape'
// - make the RadioGroup update accordingly
//
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'

const { bool, string, func } = React.PropTypes

const RadioGroup = React.createClass({
  propTypes: {
    defaultValue: string
  },

  render() {
    return <div>{this.props.children}</div>
  }
})

const RadioOption = React.createClass({
  propTypes: {
    value: string
  },

  render() {
    return (
      <div>
        <RadioIcon isSelected={false}/> {this.props.children}
      </div>
    )
  }
})

const RadioIcon = React.createClass({
  propTypes: {
    isSelected: bool.isRequired
  },

  render() {
    return (
      <div style={{
        borderColor: '#ccc',
        borderSize: '3px',
        borderStyle: this.props.isSelected ? 'inset' : 'outset',
        height: 16,
        width: 16,
        display: 'inline-block',
        cursor: 'pointer',
        background: this.props.isSelected ? 'rgba(0, 0, 0, 0.05)' : ''
      }}/>
    )
  }
})

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>♬ It's about time that we all turned off the radio ♫</h1>

        <RadioGroup defaultValue="fm">
          <RadioOption value="am">AM</RadioOption>
          <RadioOption value="fm">FM</RadioOption>
          <RadioOption value="tape">Tape</RadioOption>
          <RadioOption value="aux">Aux</RadioOption>
        </RadioGroup>

      </div>
    )
  }
})

render(<App/>, document.getElementById('app'))

