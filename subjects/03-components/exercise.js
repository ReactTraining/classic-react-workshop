////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render the data as tabs, with their `name` as the label in the tab
//   and their `description` inside the tab panel
// - Make it so that you can click a tab label and the panel renders
//   the correct content
// - Make sure the active tab has the active styles
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'

const styles = {}

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
}

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: '#000'
}

styles.panel = {
  padding: 10
}

const Tabs = React.createClass({
  render() {
    return (
      <div className="Tabs">
        <div className="Tab" style={styles.activeTab}>
          Active
        </div>
        <div className="Tab" style={styles.tab}>
          Inactive
        </div>
        <div className="TabPanel" style={styles.panel}>
          Panel
        </div>
      </div>
    )
  }
})

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.props.countries} />
      </div>
    )
  }
})

const DATA = [
  { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
  { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
  { id: 3, name: 'Russia', description: 'World Cup 2018!' }
]

render(<App countries={DATA} />, document.getElementById('app'), function () {
  require('./tests').run(this)
})
