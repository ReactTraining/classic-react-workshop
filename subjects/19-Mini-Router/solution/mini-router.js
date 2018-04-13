import React from "react";
import PropTypes from "prop-types";
import { createHashHistory } from "history";

import { createContext } from "react-broadcast";

const RoutingContext = createContext();

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

  render() {
    return (
      <RoutingContext.Provider
        value={{ location: this.state.location, history: this.history }}
      >
        {this.props.children}
      </RoutingContext.Provider>
    );
  }
}

class Route extends React.Component {
  render() {
    return (
      <RoutingContext.Consumer>
        {({ location }) => {
          const { path, render, component: Component } = this.props;

          if (location.pathname.startsWith(path)) {
            if (render) {
              return render();
            }

            if (Component) {
              return <Component />;
            }

            return null;
          } else {
            return null;
          }
        }}
      </RoutingContext.Consumer>
    );
  }
}

class Link extends React.Component {
  handleClick = (e, push) => {
    e.preventDefault();
    push(this.props.to);
  };

  render() {
    return (
      <RoutingContext.Consumer>
        {({ history }) => (
          <a
            href={`#${this.props.to}`}
            onClick={e => this.handleClick(e, history.push)}
          >
            {this.props.children}
          </a>
        )}
      </RoutingContext.Consumer>
    );
  }
}

export { Router, Route, Link };
