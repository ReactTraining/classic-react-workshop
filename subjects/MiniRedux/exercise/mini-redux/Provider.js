import React from 'react'

const Provider = React.createClass({
  render() {
    return <div>{this.props.children}</div>
  }
})

export default Provider
