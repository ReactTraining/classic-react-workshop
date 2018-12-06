import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import createMediaListener from "./utils/createMediaListener";
import createClass from "create-react-class";

function withMedia(ComposedComponent, queries) {
  const media = createMediaListener(queries);

  return class WithMedia extends React.Component {
    state = { media: media.getState() };

    componentDidMount() {
      media.listen(media => this.setState({ media }));
    }

    componentWillUnmount() {
      media.dispose();
    }

    render() {
      return (
        <ComposedComponent {...this.props} media={this.state.media} />
      );
    }
  };
}

class App extends React.Component {
  render() {
    const { media, bigMessage } = this.props;

    return media.big ? (
      <h1>{bigMessage}</h1>
    ) : media.tiny ? (
      <h6>tiny tiny tiny</h6>
    ) : (
      <h3>Somewhere in between</h3>
    );
  }
}

const AppWithMedia = withMedia(App, {
  big: "(min-width : 1000px)",
  tiny: "(max-width: 400px)"
});

ReactDOM.render(
  <AppWithMedia bigMessage="Heyyooooo" />,
  document.getElementById("app")
);
