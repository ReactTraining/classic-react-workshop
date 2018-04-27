import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { createCache, createResource } from "simple-cache-provider";

function loadSum([a, b]) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(a + b);
    }, 5000);
  });
}

function hashSum([a, b]) {
  return `${a + b}`;
}

const sum = createResource(loadSum, hashSum);
const cache = createCache();

class SumAsync extends React.Component {
  render() {
    return (
      <p>The sum is {sum.read(cache, [this.props.a, this.props.b])}</p>
    );
  }
}

class Await extends React.Component {
  state = { resolving: false };

  componentDidCatch(what) {
    this.setState({ resolving: true });

    if (what.then) {
      what.then(
        () => {
          this.setState({ resolving: false });
        },
        () => {
          this.setState({ resolving: false });
        }
      );
    } else {
      throw what;
    }
  }

  render() {
    return this.props.children(this.state.resolving);
  }
}

class App extends React.Component {
  state = { showTheAsyncStuff: false };

  handleClick = () => {
    this.deferSetState({ showTheAsyncStuff: true });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click me!</button>
        {this.state.showTheAsyncStuff && <SumAsync a={3} b={4} />}

        {/*
        <Await>
          {resolving =>
            resolving ? <p>Resolving...</p> : <SumAsync a={3} b={4} />
          }
        </Await>
        */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
