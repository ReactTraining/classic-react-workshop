import React from 'react'

export default function connect(mapStateToProps) {
  return function (Component) {
    return class Connected extends React.Component {
      static contextTypes = {
        store: React.PropTypes.object
      }

      constructor(props, context) {
        super(props, context)
        this.state = this.getStateFromStore()
      }

      componentDidMount() {
        this.context.store.listen(this.listener)
      }

      componentWillUnmount() {
        this.context.store.removeListener(this.listener)
      }

      listener = () => {
        this.setState(this.getStateFromStore())
      }

      getStateFromStore() {
        const storeState = this.context.store.getState()
        return mapStateToProps(storeState)
      }

      render() {
        return <Component {...this.state} dispatch={this.context.store.dispatch}/>
      }
    }
  }
}
