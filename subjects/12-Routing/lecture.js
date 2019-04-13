import React, { useEffect, useState } from "react";
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
  return (
    <div>
      <h1>Welcome to the app!</h1>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Setup a hashchange listener so we know when the URL changes. When it does,
// update state and pick which child component we're going to render.

// function About() {
//   return <h2>About</h2>;
// }

// function Inbox() {
//   return <h2>Inbox</h2>;
// }

// function Home() {
//   return <h2>Home</h2>;
// }

// function App() {
//   const [path, setPath] = useState(window.location.hash.substring(1));

//   useEffect(() => {
//     window.addEventListener("hashchange", () => {
//       setPath(window.location.hash.substring(1));
//     });
//   }, []);

//   let Child;
//   switch (path) {
//     case "/about":
//       Child = About;
//       break;
//     case "/inbox":
//       Child = Inbox;
//       break;
//     default:
//       Child = Home;
//   }

//   return (
//     <div>
//       <h1>Welcome to the app!</h1>
//       <nav>
//         <ul>
//           <li>
//             <a href="#/">Home</a>
//           </li>
//           <li>
//             <a href="#/about">About</a>
//           </li>
//           <li>
//             <a href="#/inbox">Inbox</a>
//           </li>
//         </ul>
//       </nav>
//       <Child />
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Now, with React Router

// import { HashRouter as Router, Route, Link } from "react-router-dom";

// function About() {
//   return <h2>About</h2>;
// }

// function Inbox() {
//   return <h2>Inbox</h2>;
// }

// function Home() {
//   return <h2>Home</h2>;
// }

// function App() {
//   return (
//     <Router>
//       <div>
//         <h1>Welcome to the app!</h1>

//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/inbox">Inbox</Link>
//             </li>
//           </ul>
//         </nav>

//         <Route exact path="/" component={Home} />
//         <Route path="/about" component={About} />
//         <Route path="/inbox" component={Inbox} />
//       </div>
//     </Router>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));
