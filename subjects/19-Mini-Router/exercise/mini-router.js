import React from "react";
import PropTypes from "prop-types";
import { createHashHistory } from "history";

import { createContext } from "react-broadcast";

/*
// read the current URL
history.location

// listen for changes to the URL
history.listen(() => {
  history.location // is now different
})

// change the URL
history.push('/something')
*/

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
    const { path, render, component: Component } = this.props;

    return (
      <RoutingContext.Consumer>
        {({ location }) =>
          location.pathname.startsWith(path) ? (
            render ? (
              render()
            ) : Component ? (
              <Component />
            ) : null
          ) : null
        }
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

const withHistory = Component =>
  class extends React.Component {
    render() {
      return (
        <RoutingContext.Consumer>
          {({ history }) => (
            <Component {...this.props} history={history} />
          )}
        </RoutingContext.Consumer>
      );
    }
  };

class PureRedirect extends React.Component {
  componentDidMount() {
    this.doImperativeWork();
  }

  componentDidUpdate() {
    this.doImperativeWork();
  }

  doImperativeWork() {
    const { from, to, history } = this.props;

    if (history.location.pathname === from) {
      history.replace(to);
    }
  }

  render() {
    return null;
  }
}

const Redirect = withHistory(PureRedirect);

export { Router, Route, Link, Redirect };
