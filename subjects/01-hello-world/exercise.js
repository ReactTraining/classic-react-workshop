////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - change the contents of the render function and save the file
// - see the updates automatically in your browser without refreshing!
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'

class App extends React.Component {

  render() {
    return <div>Hello world!</div>
  }

}

render(<App/>, document.getElementById('app'))

