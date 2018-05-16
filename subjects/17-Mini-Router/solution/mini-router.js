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

  state = {
    location: this.history.location
  };

  componentDidMount() {
    this.history.listen(location => {
      this.setState({ location });
    });
  }

  handlePush = to => {
    this.history.push(to);
  };

  render() {
    return (
      <RouterContext.Provider
        {...this.props}
        value={{ location: this.state.location, push: this.handlePush }}
      />
    );
  }
}

class Route extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {router => {
          const { path, render, component: Component } = this.props;

          if (router.location.pathname.startsWith(path)) {
            if (render) return render();
            if (Component) return <Component />;
          }

          return null;
        }}
      </RouterContext.Consumer>
    );
  }
}

class Link extends React.Component {
  handleClick = (event, router) => {
    event.preventDefault();
    router.push(this.props.to);
  };

  render() {
    return (
      <RouterContext.Consumer>
        {router => (
          <a
            href={`#${this.props.to}`}
            onClick={event => this.handleClick(event, router)}
          >
            {this.props.children}
          </a>
        )}
      </RouterContext.Consumer>
    );
  }
}

export { Router, Route, Link };
