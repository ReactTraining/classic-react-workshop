import React from 'react'
import ReactDOM from 'react-dom'

class Lines extends React.Component {
  static defaultProps = {
    maxLength: 5
  }

  state = {
    lines: []
  }

  addLine = () => {
    this.setState(state => {
      const lines = state.lines.concat([ 'The date is ' + (new Date).toLocaleString() ])

      return {
        lines: lines.length > this.props.maxLength ? lines.slice(1) : lines
      }
    })
  }

  componentDidMount() {
    setInterval(this.addLine, 1000)
  }

  render() {
    return (
      <ul>
        {this.state.lines.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    )
  }
}

ReactDOM.render(<Lines/>, document.getElementById('app'))

// import React from 'react'
// import ReactDOM from 'react-dom'
// import Perf from 'react-addons-perf'
//
// let guid = 0
//
// const ITEMS = []
// for (let i = 0; i < 200; i++)
//   ITEMS.push({ id: ++guid, body: `item ${guid}` })
//
// class TodoItem extends React.Component {
//   render() {
//     return (
//       <li>
//         <span><input type="checkbox"/> </span>
//         <span>
//           <span><b>item:</b> </span>
//           <span className="stuff"/>
//           <span className="stuff"/>
//           <span className="stuff"/>
//           <span className="stuff"/>
//           <span className="stuff"/>
//           <span className="stuff"/>
//           <span className="stuff"/>
//           <span className="stuff"/>
//           <span className="stuff"/>
//         </span>
//         <span tabIndex="-1">
//           <span className="thing">
//             <span style={{ color: 'blue' }}>{this.props.body}</span>
//           </span>
//         </span>
//       </li>
//     )
//   }
// }
//
// class TodoList extends React.Component {
//   state = {
//     items: ITEMS
//   }
//
//   handleSubmit = (event) => {
//     event.preventDefault()
//
//     const item = {
//       id: ++guid,
//       body: event.target.elements[0].value
//     }
//
//     event.target.reset()
//
//     this.setState({
//       items: [ item ].concat(this.state.items)
//     })
//   }
//
//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <input ref="input"/>
//         </form>
//         <ul>
//           {this.state.items.map(item => (
//             <TodoItem key={item.id} body={item.body}/>
//           ))}
//         </ul>
//       </div>
//     )
//   }
// }
//
// ReactDOM.render(<TodoList/>, document.getElementById('app'))

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
