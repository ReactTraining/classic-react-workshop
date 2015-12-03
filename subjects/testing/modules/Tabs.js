import React from 'react'

const { arrayOf, string, shape } = React.PropTypes

const tab = shape({
  label: string.isRequired,
  content: string.isRequired
})

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
  propTypes: {
    data: arrayOf(tab)
  },
  getInitialState() {
    return {
      activeTabIndex: 0
    }
  },
  selectTabIndex(activeTabIndex) {
    this.setState({
      activeTabIndex
    })
  },
  render() {
    const { data } = this.props
    const { activeTabIndex } = this.state

    const tabs = data.map((tab, index) => {
      const isActive = index === activeTabIndex
      const style = isActive ? styles.activeTab : styles.tab

      return (
        <div
          key={tab.label}
          className="Tab"
          style={style}
          onClick={() => this.selectTabIndex(index)}
        >{tab.label}</div>
      )
    })

    const activeTab = data[activeTabIndex]
    const content = activeTab && activeTab.content

    return (
      <div className="Tabs">
        {tabs}
        <div className="TabPanel" style={styles.panel}>
          {content}
        </div>
      </div>
    )
  }
})

export default Tabs
