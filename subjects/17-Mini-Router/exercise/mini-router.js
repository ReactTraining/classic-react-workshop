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
history.replace('/something')
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

  handleReplace = to => {
    this.history.replace(to);
  };

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

function withRouter(Component) {
  return props => (
    <RouterContext.Consumer>
      {router => <Component {...props} router={router} />}
    </RouterContext.Consumer>
  );
}

const Redirect = withRouter(
  class extends React.Component {
    doImperativeWork() {
      const { location, replace } = this.props.router;

      if (location.pathname.startsWith(this.props.from)) {
        replace(this.props.to);
      }
    }

    componentDidMount() {
      this.doImperativeWork();
    }

    componentDidUpdate() {
      this.doImperativeWork();
    }

    render() {
      return null;
    }
  }
);

export { Router, Route, Link, Redirect };
