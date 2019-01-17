import React from "react";
import PropTypes from "prop-types";
import { createHashHistory } from "history";

/*
How to use the history library:

// read the current URL
history.location

// listen for changes to the URL
history.listen(() => {
  history.location // is now different
})

// change the URL
history.push('/something')
*/

const RouterContext = React.createContext();

class Router extends React.Component {
  history = createHashHistory();
  state = { location: this.history.location };

  componentDidMount() {
    this.history.listen(location => {
      this.setState({ location });
    });
  }

  handlePush = location => {
    this.history.push(location);
  };

  render() {
    return (
      <RouterContext.Provider
        value={{
          location: this.state.location,
          push: this.handlePush
        }}
      >
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}

class Route extends React.Component {
  static contextType = RouterContext;
  render() {
    const { path, render, component: Component } = this.props;
    const { location } = this.context;

    if (location.pathname.startsWith(path)) {
      // We matched the URL! Render something.
      if (render) return render();
      if (Component) return <Component />;
    }

    return null;
  }
}

class Link extends React.Component {
  static contextType = RouterContext;

  handleClick = event => {
    event.preventDefault();
    this.context.push(this.props.to);
  };

  render() {
    return (
      <a href={`#${this.props.to}`} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

export { Router, Route, Link };
