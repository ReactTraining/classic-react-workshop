import React from 'react'
import { render } from 'react-dom'
import Perf from 'react-addons-perf'

let guid = 0

const ITEMS = []
for (let i = 0; i < 200; i++)
  ITEMS.push({ id: ++guid, body: `item ${guid}` })

class TodoItem extends React.Component {
  render() {
    return (
      <li>
        <span><input type="checkbox"/> </span>
        <span>
          <span><b>item:</b> </span>
          <span className="stuff"/>
          <span className="stuff"/>
          <span className="stuff"/>
          <span className="stuff"/>
          <span className="stuff"/>
          <span className="stuff"/>
          <span className="stuff"/>
          <span className="stuff"/>
          <span className="stuff"/>
        </span>
        <span tabIndex="-1">
          <span className="thing">
            <span style={{ color: 'blue' }}>{this.props.body}</span>
          </span>
        </span>
      </li>
    )
  }
}

class TodoList extends React.Component {
  state = {
    items: ITEMS
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const item = {
      id: ++guid,
      body: event.target.elements[0].value
    }

    event.target.reset()

    this.setState({
      items: [ item ].concat(this.state.items)
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input ref="input"/>
        </form>
        <ul>
          {this.state.items.map(item => (
            <TodoItem key={item.id} body={item.body}/>
          ))}
        </ul>
      </div>
    )
  }
}

render(<TodoList/>, document.getElementById('app'))

//import React, { PropTypes } from 'react'
//import { render, findDOMNode } from 'react-dom'
//import Perf from 'react-addons-perf'
//import { convertNumberToEnglish } from './NumberUtils'
//import { createRange } from './RangeUtils'
//
//const TodoItem = React.createClass({
//  propTypes: {
//    text: PropTypes.string,
//    isDone: PropTypes.bool.isRequired,
//    onChange: PropTypes.func.isRequired
//  },
//
//  handleChange(event) {
//    this.props.onChange(event.target.checked)
//  },
//
//  //shouldComponentUpdate(nextProps) {
//  //  return nextProps.text !== this.props.text || nextProps.isDone !== this.props.isDone
//  //},
//
//  render() {
//    const { text, isDone } = this.props
//
//    return (
//      <li>
//        <label>
//          <input type="checkbox" checked={isDone} onChange={this.handleChange}/>
//          <strong>{isDone ? 'done' : 'todo'}: </strong>
//          <span style={{ color: 'blue' }}>{text}</span>
//        </label>
//      </li>
//    )
//  }
//})
//
//const TodoList = React.createClass({
//  getInitialState() {
//    this.guid = 0
//
//    return {
//      items: createRange(5000).map(n => ({
//        key: ++this.guid,
//        text: convertNumberToEnglish(n + 1),
//        isDone: Math.random() < 0.5
//      }))
//    }
//  },
//
//  updateItem(item, isDone) {
//    item.isDone = isDone
//
//    Perf.start()
//
//    this.forceUpdate(() => {
//      Perf.stop()
//      Perf.printWasted()
//    })
//  },
//
//  handleSubmit(event) {
//    event.preventDefault()
//
//    const item = {
//      key: ++this.guid,
//      text: event.target.elements[0].value,
//      isDone: false
//    }
//
//    event.target.reset()
//
//    Perf.start()
//
//    this.setState({
//      items: [ item ].concat(this.state.items)
//    }, () => {
//      Perf.stop()
//      Perf.printWasted()
//      //Perf.printInclusive()
//    })
//  },
//
//  componentDidMount() {
//    findDOMNode(this).querySelector('input').focus()
//  },
//
//  render() {
//    return (
//      <div>
//        <form onSubmit={this.handleSubmit}>
//          <input ref="input"/>
//        </form>
//        <ul>
//          {this.state.items.map(item => (
//            <TodoItem
//              key={item.key}
//              text={item.text}
//              isDone={item.isDone}
//              onChange={isDone => this.updateItem(item, isDone)}
//            />
//          ))}
//        </ul>
//      </div>
//    )
//  }
//})
//
//render(<TodoList/>, document.getElementById('app'))

///////////////////////////////////////////////////////////////////////////////
// Rendering large lists can be super slow. This is an old UI problem.

///////////////////////////////////////////////////////////////////////////////
// One possible solution is to only render the stuff that's actually in the
// view. Native mobile frameworks have been doing this for years:
//
// https://developer.apple.com/library/ios/documentation/UIKit/Reference/UITableView_Class/index.html

///////////////////////////////////////////////////////////////////////////////
// I'd really like to do this in my web app! What does it look like when we
// try to do this with imperative JavaScript?
//
// https://github.com/airbnb/infinity
// https://github.com/emberjs/list-view
