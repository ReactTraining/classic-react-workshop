////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Implement a radio group form control with the API found in <App>.
//
// - Clicking a <RadioOption> should update the value of <RadioGroup>
// - The selected <RadioOption> should pass the correct value to its <RadioIcon>
// - The `defaultValue` should be set on first render
//
// Hints to get started:
//
// - <RadioGroup> will need some state
// - It then needs to pass that state to the <RadioOption>s so they know
//   whether or not they are active
//
// Got extra time?
//
// Implement a `value` prop and allow this to work like a "controlled input"
// (https://facebook.github.io/react/docs/forms.html#controlled-components)
//
// - Add a button to <App> that sets `this.state.radioValue` to a pre-determined
//   value, like "tape"
// - Make the <RadioGroup> update accordingly
//
// Implement keyboard controls on the <RadioGroup> (you'll need tabIndex="0" on
// the <RadioOption>s so the keyboard will work)
//
// - Enter and space bar should select the option
// - Arrow right, arrow down should select the next option
// - Arrow left, arrow up should select the previous option
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

class RadioGroup extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.string
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

class RadioOption extends React.Component {
  static propTypes = {
    value: PropTypes.string
  }

  render() {
    return (
      <div>
        <RadioIcon isSelected={false}/> {this.props.children}
      </div>
    )
  }
}

class RadioIcon extends React.Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired
  }

  render() {
    return (
      <div
        style={{
          borderColor: '#ccc',
          borderSize: '3px',
          borderStyle: this.props.isSelected ? 'inset' : 'outset',
          height: 16,
          width: 16,
          display: 'inline-block',
          cursor: 'pointer',
          background: this.props.isSelected ? 'rgba(0, 0, 0, 0.05)' : ''
        }}
      />
    )
  }
}

class App extends React.Component {
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
}

ReactDOM.render(<App/>, document.getElementById('app'))
