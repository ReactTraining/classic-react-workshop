import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import createMediaListener from "./utils/createMediaListener";
import createReactClass from "create-react-class";

const withMedia = (Component, queries) => {
  const media = createMediaListener(queries);

  return class extends React.Component {
    static displayName = `withMedia(${Component.displayName ||
      Component.name})`;

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
};

class App extends React.Component {
  render() {
    const { media, message } = this.props;

    return media.big ? (
      <h1>{message}</h1>
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
  <AppWithMedia message="hi everyone" />,
  document.getElementById("app")
);
