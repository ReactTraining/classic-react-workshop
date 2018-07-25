////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Implement the core components of React Router to make this app work:
//
// <Router>
// 1. Add some state w/ `location` as a key
// 2. Set `location`'s initial value to `this.history.location`
// 3. Listen to `history` and put the location into state
// 4. Use context to provide API to descendants
//
// <Route>
// 1. Get the location from context
// 2. Figure out if the path matches location.pathname
//    (hint: location.pathname.startsWith(...)
// 3. If there is a match, figure out which prop to render
//    `component` or `render`
// 4. If there is no match, render null
//
// <Link>
// 1. Get a "push" method from context
// 2. Use `push(...)` with the `to` prop
//
// Got extra time?
//
// - Implement <Redirect> or <Switch>
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";

// You will be working in mini-router.js. This file is just an example app that
// uses the components from that library.
import { Router, Route, Link } from "./solution/mini-router";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <hr />

        <Route
          path="/dashboard"
          render={() => (
            <div>
              <h2>Dashboard</h2>
            </div>
          )}
        />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
    </Router>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Topics() {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>Rendering with React</li>
        <li>Components</li>
        <li>Props v. State</li>
      </ul>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
