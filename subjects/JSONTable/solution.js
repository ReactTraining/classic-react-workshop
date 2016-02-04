////////////////////////////////////////////////////////////////////////////////
// Requirements
//
// - fetch the src with getJSON((error, payload) => {})
// - render the content of the th's from the field names (hint: use
//   the field names from the first record)
// - render each result as a row in <tbody>
import 'purecss/build/pure.css'
import React from 'react'
import { render } from 'react-dom'
import getJSON from './lib/getJSON'

function isURL(content) {
  return (/^https?:\/\//).test(content)
}

function isImageURL(content) {
  return isURL(content) && (/\.(jpe?g|gif|png)$/).test(content)
}

class JSONTable extends React.Component {
  static propTypes = {
    src: React.PropTypes.string.isRequired,
    getData: React.PropTypes.func.isRequired,
    getKey: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    getKey: (item) => item.id
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    getJSON(this.props.src, (error, payload) => {
      this.setState({
        data: this.props.getData(payload)
      })
    })
  }

  formatContent(content) {
    if (Array.isArray(content))
      return content.map(this.formatContent)

    if (isImageURL(content))
      return <p><img key={content} height="64" src={content} /></p>

    if (isURL(content))
      return <p><a key={content} href={content}>{content}</a></p>

    return content
  }

  render() {
    let { data } = this.state

    if (data == null || data.length === 0)
      return null

    let fields = Object.keys(data[0])

    return (
      <table className="pure-table pure-table-striped">
        <thead>
          <tr>
          {fields.map(field => <th key={field}>{field}</th>)}
          </tr>
        </thead>
        <tbody>
        {data.map(item => (
          <tr key={this.props.getKey(item)}>
          {fields.map(field => (
            <td key={field}>{this.formatContent(item[field])}</td>
          ))}
          </tr>
        ))}
        </tbody>
      </table>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>JSONTable</h1>
        <JSONTable
          src="https://addressbook-api.herokuapp.com/contacts"
          getData={payload => payload.contacts}
        />
        {/*
        <JSONTable
          src="http://swapi.co/api/people/"
          getData={payload => payload.results}
          getKey={item => item.url}
        />
        */}
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
