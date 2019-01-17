import React from "react";
import ReactDOM from "react-dom";

import { HashRouter, Route, Link } from "react-router-dom";

function About() {
  return <h2>About</h2>;
}

function Inbox({ match }) {
  console.log(match);
  return (
    <div>
      <h2>Inbox</h2>

      <Link to={`${match.url}/5`}>Show message "5"</Link>

      {match.params.messageId && (
        <p>Message {match.params.messageId}</p>
      )}
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Welcome to the app!</h1>

          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/inbox">Inbox</Link>
            </li>
          </ul>

          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/inbox/:messageId?" component={Inbox} />
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
