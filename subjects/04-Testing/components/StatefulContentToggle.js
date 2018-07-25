import React from "react";
import ContentToggle from "./ContentToggle";

class StatefulContentToggle extends React.Component {
  state = { isOpen: false };

  render() {
    return (
      <ContentToggle
        {...this.props}
        isOpen={this.state.isOpen}
        onToggle={isOpen => this.setState({ isOpen })}
      />
    );
  }
}

export default StatefulContentToggle;
