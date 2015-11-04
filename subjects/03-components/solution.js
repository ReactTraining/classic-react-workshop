import React from 'react'
import { render } from 'react-dom'

const DATA = [
  { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
  { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
  { id: 3, name: 'Russia', description: 'World Cup 2018!' },
]

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

class Tabs extends React.Component {

  static propTypes = {
    data: React.PropTypes.array
  }

  constructor(props) {
    super(props)
    this.state = {
      activeTabIndex: 0
    }
  }

  handleClick(clickedIndex) {
    this.setState({
      activeTabIndex: clickedIndex
    })
  }

  render() {
    const activeTab = this.props.data[this.state.activeTabIndex]

    return (
      <div className="Tabs">
        {this.props.data.map((d, i) => (
          <div
            key={d.id}
            className="Tab"
            onClick={() => this.handleClick(i)}
            style={i === this.state.activeTabIndex ? styles.activeTab : styles.tab}
          >
            {d.name}
          </div>
        ))}
        <div className="TabPanels" style={styles.panel}>
          {activeTab.description}
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.props.countries}/>
      </div>
    )
  }
}

render(<App countries={DATA}/>, document.getElementById('app'), () => {
  require('./tests')()
})
