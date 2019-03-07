import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import createMediaListener from "./utils/createMediaListener";

function withMedia(Component, options) {
  const media = createMediaListener(options);
  return class WithMedia extends React.Component {
    state = { media: media.getState() };

    componentDidMount() {
      media.listen(media => this.setState({ media }));
    }

    componentWillUnmount() {
      media.dispose();
    }

    render() {
      return <Component {...this.props} media={this.state.media} />;
    }
  };
}

const Messages = ({ media, text }) => {
  return media.big ? (
    <h1>Hey, this is a big screen {text}</h1>
  ) : media.tiny ? (
    <h6>tiny tiny tiny</h6>
  ) : (
    <h3>Somewhere in between</h3>
  );
};

const EnhancedMessages = withMedia(Messages, {
  big: "(min-width : 1000px)",
  tiny: "(max-width: 400px)"
});

function App() {
  return <EnhancedMessages text="Hello AMEX" />;
}

ReactDOM.render(<App />, document.getElementById("app"));
