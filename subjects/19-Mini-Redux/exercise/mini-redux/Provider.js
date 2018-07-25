import React from "react";

class Provider extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Provider;
