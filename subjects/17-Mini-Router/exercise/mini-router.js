import React from "react";
import PropTypes from "prop-types";
import { createHashHistory } from "history";

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

const RouterContext = React.createContext();

class Router extends React.Component {
  history = createHashHistory();

  state = { location: this.history.location };

  componentDidMount() {
    this.history.listen(location => {
      this.setState({ location });
    });
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          location: this.state.location,
          push: this.history.push
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
        {({ location }) => {
          const { path, render, component: Component } = this.props;

          if (location.pathname.startsWith(path)) {
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
  handleClick = (e, push) => {
    e.preventDefault();
    this.push(this.props.to);
  };

  render() {
    return (
      <RouterContext.Consumer>
        {({ push }) => {
          this.push = push;

          return (
            <a href={`#${this.props.to}`} onClick={this.handleClick}>
              {this.props.children}
            </a>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}

class Switch extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {({ location }) => {
          const children = React.Children.toArray(this.props.children);

          const route = children.find(child =>
            location.pathname.startsWith(child.props.path)
          );

          return route;
        }}
      </RouterContext.Consumer>
    );
  }
}

export { Router, Route, Link, Switch };
