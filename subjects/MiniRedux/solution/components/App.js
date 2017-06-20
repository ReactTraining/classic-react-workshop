import React from 'react'
import PropTypes from 'prop-types'
import connect from '../mini-redux/connect'

class App extends React.Component {
  increment = () => {
    this.props.dispatch({ type: 'INCREMENT' })
  }

  decrement = () => {
    this.props.dispatch({ type: 'DECREMENT' })
  }

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
}

const mapStateToProps = (state) => {
  return { counter: state }
}

export default connect(mapStateToProps)(App)
