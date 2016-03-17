import React from 'react'

export default function connect(selectState) {
  return function (Component) {
    return React.createClass({
      contextTypes: {
        store: React.PropTypes.object
      },
      render() {
        const store = this.context.store
        const props = selectState(store.getState())
        return <Component {...props} dispatch={store.dispatch}/>
      }
    })
  }
}
