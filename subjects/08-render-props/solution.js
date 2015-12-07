////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <Tail/> that only logs the last `n` number of rows in a dataset,
// with an API that allows the developer to control the rendering.
//
// Hint: You can use a prop that renders a single item, or you can pass all
// the items to the render prop handing over all rendering control to the
// developer
//
// Got extra time?
//
// - make the Tail scroll to the bottom when new rows come in
// - if you didn't already do it this way, make it declarative with a
//   <PinnedToBottom/> component
// - now make sure if the user scrolls up, you don't scroll them down
// - make a <JSONP/> component that fetches data with the jsonp package used in
//   `utils/githubSearch` that uses a render prop to pass its data back up
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render, findDOMNode } from 'react-dom'
import { listen } from './utils/log'

const { arrayOf, func, number, oneOfType, string } = React.PropTypes

const component = oneOfType([ string, func ])

const PinnedToBottom = React.createClass({

  propTypes: {
    component: component.isRequired,
    tolerance: number.isRequired
  },

  getDefaultProps() {
    return {
      component: 'div',
      tolerance: 10
    }
  },

  scrollToBottom() {
    const node = findDOMNode(this)
    node.scrollTop = node.scrollHeight
  },

  adjustScrollPosition() {
    if (this.pinToBottom)
      this.scrollToBottom()
  },

  componentWillMount() {
    this.pinToBottom = true
  },

  componentDidMount() {
    this.adjustScrollPosition()
  },

  componentWillUpdate() {
    const { clientHeight, scrollHeight, scrollTop } = findDOMNode(this)
    this.pinToBottom = (scrollHeight - (clientHeight + scrollTop)) < this.props.tolerance
  },

  componentDidUpdate() {
    this.adjustScrollPosition()
  },

  render() {
    const { children, component, style } = this.props

    return React.createElement(component, {
      style: { ...style, overflowY: 'scroll' },
      children
    })
  }

})

const Tail = React.createClass({

  propTypes: {
    lines: arrayOf(string).isRequired,
    n: number.isRequired
  },

  getDefaultProps() {
    return {
      n: 15
    }
  },

  render() {
    const { children, lines, n } = this.props
    return children(lines.slice(-n))
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
        {/* <PinnedToBottom style={{ height: 400, border: '1px solid' }}> */}
          <Tail lines={this.state.lines} n={5}>
            {truncatedLines =>
              <ul>
                {truncatedLines.map((line, index) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            }
          </Tail>
        {/* </PinnedToBottom> */}
        </div>
      </div>
    )
  }

})

render(<App />, document.getElementById('app'))
