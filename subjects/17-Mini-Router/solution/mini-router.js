import React from "react";
import PropTypes from "prop-types";
import { createHashHistory } from "history";

class Router extends React.Component {
  static childContextTypes = {
    location: PropTypes.object,
    history: PropTypes.object
  };

  getChildContext() {
    return {
      location: this.state.location,
      history: this.history
    };
  }

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
    return this.props.children;
  }
}

class Route extends React.Component {
  static contextTypes = {
    location: PropTypes.object
  };

  render() {
    const { location } = this.context;
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
  }
}

class Link extends React.Component {
  static contextTypes = {
    history: PropTypes.object
  };

  handleClick = e => {
    e.preventDefault();
    this.context.history.push(this.props.to);
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
