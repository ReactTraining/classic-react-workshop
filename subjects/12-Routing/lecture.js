import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";

function About() {
  return <h2>About</h2>;
}

function Inbox() {
  return <h2>Inbox</h2>;
}

function Home() {
  return <h2>Home</h2>;
}

function App() {
  // const [path, setPath] = useState(window.location.hash.substr(1));

  // useEffect(() => {
  //   window.addEventListener("hashchange", () => {
  //     setPath(window.location.hash.substr(1));
  //   });
  // }, []);

  return (
    <Router>
      <div>
        <h1>Welcome to the app!</h1>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#inbox">Inbox</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/inbox" component={Inbox} />
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
