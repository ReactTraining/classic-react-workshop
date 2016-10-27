import React from 'react'

class Provider extends React.Component {
  static childContextTypes = {
    store: React.PropTypes.object
  }

  getChildContext() {
    return {
      store: this.props.store
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

export default Provider
