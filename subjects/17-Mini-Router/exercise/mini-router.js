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

class Router extends React.Component {
  history = createHashHistory();

  render() {
    return this.props.children;
  }
}

class Route extends React.Component {
  render() {
    const { path, render, component: Component } = this.props;
    return null;
  }
}

class Link extends React.Component {
  handleClick = event => {
    event.preventDefault();
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
