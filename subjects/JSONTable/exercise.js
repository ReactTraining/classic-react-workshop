////////////////////////////////////////////////////////////////////////////////
// Requirements
//
// - fetch the src with getJSON((error, payload) => {})
// - render the content of the th's from the field names (hint: use
//   the field names from the first record)
// - render each result as a row in <tbody>
import 'purecss/build/pure.css'
import React from 'react'
import ReactDOM from 'react-dom'
import getJSON from './utils/getJSON'

const JSONTable = React.createClass({
  render() {
    return <div>...</div>
  }
})

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>JSONTable</h1>
        <JSONTable
          src="https://addressbook-api.herokuapp.com/contacts"
          getData={payload => payload.contacts}
        />
      </div>
    )
  }
})

ReactDOM.render(<App/>, document.getElementById('app'))
