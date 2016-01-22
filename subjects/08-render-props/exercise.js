////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <Tail> that only logs the last `n` number of rows in a dataset,
// with an API that allows the developer to control the rendering.
//
// Hint: You can use a prop that renders a single item, or you can pass all
// the items to the render prop handing over all rendering control to the
// developer
//
// Got extra time?
//
// - Make the <Tail> scroll to the bottom when new rows come in
// - If you didn't already do it this way, make it declarative with a
//   <PinnedToBottom> component
// - Now make sure if the user scrolls up, you don't scroll them down
// - Make a <JSONP> component that fetches data with the jsonp package used in
//   `utils/githubSearch` that uses a render prop to pass its data back up
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import { listen } from './utils/log'

const Tail = React.createClass({
  render() {
    const { lines } = this.props

    return (
      <ul>
        {lines.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    )
  }
})

const App = React.createClass({
  getInitialState() {
    return {
      lines: []
    }
  },

  componentDidMount() {
    listen(newLines => {
      this.setState({
        lines: this.state.lines.concat(newLines)
      })
    })
  },

  render() {
    return (
      <div>
        <h1>Heads up Eggman, here comes <code>&lt;Tails&gt;</code>s!</h1>
        <div style={{ height: 400, overflowY: 'scroll', border: '1px solid' }}>
          <Tail lines={this.state.lines}/>
        </div>
      </div>
    )
  }
})

render(<App/>, document.getElementById('app'))
