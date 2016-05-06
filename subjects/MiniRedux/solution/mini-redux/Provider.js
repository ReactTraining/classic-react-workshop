import React from 'react'

const Provider = React.createClass({
  childContextTypes: {
    store: React.PropTypes.object
  },

  getChildContext() {
    return {
      store: this.props.store
    }
  },

  componentDidMount() {
    this.props.store.listen(this.listener)
  },

  componentWillUnmount() {
    this.props.store.removeListener(this.listener)
  },

  listener() {
    this.forceUpdate()
  },

  render() {
    return <div>{this.props.children}</div>
  }
})

export default Provider
