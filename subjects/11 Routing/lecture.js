import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route, Link } from "react-router-dom";

const About = () => {
  return <h2>About</h2>;
};

const Message = ({ id }) => {
  return (
    <div>
      <p>Now showing message {id}</p>
    </div>
  );
};

const Inbox = () => {
  return (
    <div>
      <h2>Inbox</h2>
      <Route
        path="/inbox/:id"
        children={props =>
          props.match ? (
            <Message id={props.match.params.id} />
          ) : (
            <p>No message</p>
          )
        }
      />
    </div>
  );
};

const Home = () => {
  return <h2>Home</h2>;
};

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
                <Link to="/inbox">Inbox</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/inbox" component={Inbox} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Setup a hashchange listener so we know when the URL changes. When it does,
// update state and pick which child component we're going to render.

// const About = () => {
//   return <h2>About</h2>;
// };

// const Inbox = () => {
//   return <h2>Inbox</h2>;
// };

// const Home = () => {
//   return <h2>Home</h2>;
// };

// class App extends React.Component {
//   state = {
//     path: window.location.hash.substring(1)
//   };

//   componentDidMount() {
//     window.addEventListener("hashchange", () => {
//       this.setState({ path: window.location.hash.substring(1) });
//     });
//   }

//   render() {
//     const { path } = this.state;

//     let Child;
//     switch (path) {
//       case "/about":
//         Child = About;
//         break;
//       case "/inbox":
//         Child = Inbox;
//         break;
//       default:
//         Child = Home;
//     }

//     return (
//       <div>
//         <h1>Welcome to the app!</h1>
//         <nav>
//           <a href="#/">Home</a> <a href="#/about">About</a>{" "}
//           <a href="#/inbox">Inbox</a>
//         </nav>
//         <Child />
//       </div>
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Now, with React Router

// import { HashRouter as Router, Route, Link } from "react-router-dom";

// const About = () => {
//   return <h2>About</h2>;
// };

// const Inbox = () => {
//   return <h2>Inbox</h2>;
// };

// const Home = () => {
//   return <h2>Home</h2>;
// };

// class App extends React.Component {
//   render() {
//     return (
//       <Router>
//         <div>
//           <h1>Welcome to the app!</h1>
//           <nav>
//             <Link to="/">Home</Link> <Link to="/about">About</Link>{" "}
//             <Link to="/inbox">Inbox</Link>
//           </nav>

//           <Route exact path="/" component={Home} />
//           <Route path="/about" component={About} />
//           <Route path="/inbox" component={Inbox} />
//         </div>
//       </Router>
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById("app"));
