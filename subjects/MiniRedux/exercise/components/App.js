import React, { PropTypes } from 'react'
import connect from '../mini-redux/connect'

const App = React.createClass({
  increment() {
    this.props.dispatch({ type: 'INCREMENT' })
  },

  decrement() {
    this.props.dispatch({ type: 'DECREMENT' })
  },

  render() {
    return (
      <div>
        <h1>Mini Redux!</h1>
        <button onClick={this.increment}>Increment</button>{' '}
        {this.props.counter}{' '}
        <button onClick={this.decrement}>Decrement</button>
      </div>
    )
  }
})

export default connect((state) => {
  return { counter: state }
})(App)
