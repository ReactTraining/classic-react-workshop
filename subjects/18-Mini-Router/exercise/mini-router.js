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
    this.history.listen(() => {
      this.setState({ location: this.history.location });
    });
  }

  handlePush = to => this.history.push(to);
  handleReplace = to => this.history.replace(to);

  render() {
    return (
      <RouterContext.Provider
        value={{
          location: this.state.location,
          push: this.handlePush,
          replace: this.handleReplace
        }}
      >
        {this.props.children}
      </RouterContext.Provider>
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
            // We matched the current URL!
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

class Switch extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {router => {
          let found = null;

          React.Children.forEach(this.props.children, child => {
            if (
              !found &&
              router.location.pathname.startsWith(child.props.path)
            ) {
              found = child;
            }
          });

          return found;
        }}
      </RouterContext.Consumer>
    );
  }
}

class Navigate extends React.Component {
  componentDidMount() {
    this.props.router.replace(this.props.to);
  }

  componentDidUpdate() {
    this.props.router.replace(this.props.to);
  }

  render() {
    return null;
  }
}

class Redirect extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {router => {
          if (router.location.pathname === this.props.path) {
            return <Navigate router={router} to={this.props.to} />;
          }

          return null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export { Router, Route, Link, Switch, Redirect };
