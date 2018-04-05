////////////////////////////////////////////////////////////////////////////////
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

// Got extra time?
- <Redirect to>
- <Switch>
*/

class Router extends React.Component {
  history = createHashHistory();

  state = {
    location: this.history.location
  };

  static childContextTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  getChildContext() {
    return { location: this.state.location, history: this.history };
  }

  componentDidMount() {
    this.history.listen(() => {
      this.setState({ location: this.history.location });
    });
  }

  render() {
    return this.props.children;
  }
}

class Route extends React.Component {
  static contextTypes = {
    location: PropTypes.object.isRequired
  };

  render() {
    const { location } = this.context;
    const { path, render, component: Component } = this.props;

    if (location.pathname.startsWith(path)) {
      // We matched the current URL!
      if (render) {
        return render();
      }

      if (Component) {
        return <Component />;
      }
    }

    return null;
  }
}

class Link extends React.Component {
  static contextTypes = {
    history: PropTypes.object.isRequired
  };

  handleClick = e => {
    e.preventDefault();

    const { history } = this.context;

    if (history.location.pathname !== this.props.to) {
      history.push(this.props.to);
    }
  };

  render() {
    return (
      <a href={`#${this.props.to}`} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

class Switch extends React.Component {
  static contextTypes = {
    location: PropTypes.object.isRequired
  };

  render() {
    const { location } = this.context;

    let route = null;
    React.Children.forEach(this.props.children, child => {
      if (
        route == null &&
        location.pathname.startsWith(child.props.path)
      ) {
        route = child;
      }
    });

    return route;
  }
}

export { Router, Route, Link, Switch };
