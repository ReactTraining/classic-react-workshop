import React from "react";

import ReduxContext from "./ReduxContext";

class Provider extends React.Component {
  state = {
    storeState: this.props.store.getState()
  };

  componentDidMount() {
    this.unsub = this.props.store.subscribe(() => {
      this.setState({
        storeState: this.props.store.getState()
      });
    });
  }

  componentWillUnmount() {
    this.unsub();
  }

  handleDispatch = action => {
    this.props.store.dispatch(action);
  };

  render() {
    return (
      <ReduxContext.Provider
        value={{
          dispatch: this.handleDispatch,
          state: this.state.storeState
        }}
      >
        <div>{this.props.children}</div>
      </ReduxContext.Provider>
    );
  }
}

export default Provider;
