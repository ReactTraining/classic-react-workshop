import React from 'react'
import ContentToggle from './ContentToggle'

const StatefulContentToggle = React.createClass({
  getInitialState() {
    return { isOpen: false }
  },

  render () {
    return (
      <ContentToggle
        {...this.props}
        isOpen={this.state.isOpen}
        onToggle={(isOpen) => this.setState({ isOpen })}
      />
    )
  }
})

export default StatefulContentToggle
