import React, { PropTypes } from 'react'

const connect = (mapStateToProps) => {
  return (Component) => {
    return class extends React.Component {
      static contextTypes = {
        store: PropTypes.object
      }

      componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => {
          this.forceUpdate()
        })
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        const props = mapStateToProps(this.context.store.getState())

        return (
          <Component
            {...this.props}
            {...props}
            dispatch={this.context.store.dispatch}
          />
        )
      }
    }
  }
}

export default connect
