import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Link } from "react-router-dom";

function About() {
  return <h2>About</h2>;
}

function Message({ match }) {
  const messageId = match.params.messageId;

  return (
    <div>
      <p>This is message {messageId}</p>
    </div>
  );
}

function Inbox({ match }) {
  return (
    <div>
      <h2>Inbox</h2>
      <Route path={match.url + "/:messageId"} component={Message} />
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

          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/messages">Inbox</Link>
              </li>
            </ul>
          </nav>

          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/messages" component={Inbox} />
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
