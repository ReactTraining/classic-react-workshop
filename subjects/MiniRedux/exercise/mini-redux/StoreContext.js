import React from 'react'

const StoreContext = React.createClass({
  render() {
    return <div>{this.props.children}</div>
  }
})

export default StoreContext
