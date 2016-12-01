import React, { PropTypes } from 'react'

const connect = (mapStateToProps) => {
  return (Component) => {
    return class extends React.Component {
      static contextTypes = {
        store: PropTypes.object
      }

      state = this.getStateFromStore()

      listener = () => {
        this.setState(this.getStateFromStore())
      }

      getStateFromStore() {
        const storeState = this.context.store.getState()
        return mapStateToProps(storeState)
      }

      componentDidMount() {
        this.context.store.listen(this.listener)
      }

      componentWillUnmount() {
        this.context.store.removeListener(this.listener)
      }

      render() {
        return <Component {...this.state} dispatch={this.context.store.dispatch}/>
      }
    }
  }
}

export default connect
