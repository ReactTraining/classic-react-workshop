import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Route,
  Link as ReactRouterLink,
  Switch,
  withRouter
} from "react-router-dom";

function Link({ children, to, ...rest }) {
  // database
  return condition ? (
    <a href={to} {...rest}>
      {children}
    </a>
  ) : (
    <ReactRouterLink to={to} {...rest}>
      {children}
    </ReactRouterLink>
  );
}

const api = {
  getUsers() {
    return Promise.resolve([{ name: "Nathan" }, { name: "Ryan" }]);
  }
};

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.getUsers().then(users => {
      setUsers(users);
    });
  }, []);

  console.log(users);
  return <h2>About</h2>;
}

function FriendList(props) {
  return (
    <button onClick={() => props.history.push("/")}>Go Home</button>
  );
}

const EnhancedFriendList = withRouter(FriendList);

function UserProfile({ match }) {
  return (
    <div>
      <h2>User Profile: {match.params.id}</h2>
      <EnhancedFriendList />
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Welcome to the app!</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users/6">Visit User Six</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users/:id" component={UserProfile} />
          <Route path="/users" component={Users} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
