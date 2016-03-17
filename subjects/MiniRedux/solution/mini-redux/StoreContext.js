import React from 'react'

const StoreContext = React.createClass({
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
    this.props.store.listen(this.listener)
  },

  listener() {
    this.forceUpdate()
  },

  render() {
    return <div>{this.props.children}</div>
  }
})

export default StoreContext
