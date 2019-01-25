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

const RouterContext = React.createContext();

import { useState, useEffect, useContext } from "react";

function Router({ children }) {
  const history = createHashHistory();
  const [location, updateLocation] = useState(history.location);

  useEffect(() => {
    return history.listen(updateLocation);
  }, []);

  const handlePush = to => history.push(to);

  return (
    <RouterContext.Provider value={{ location, push: handlePush }}>
      {children}
    </RouterContext.Provider>
  );
}

function Route({ path, render, component: Component }) {
  const { location } = useContext(RouterContext);

  if (location.pathname.startsWith(path)) {
    if (render) return render();
    if (Component) return <Component />;
  }

  return null;
}

function Link({ to, children }) {
  const { push } = useContext(RouterContext);

  const handleClick = event => {
    event.preventDefault(); // prevent page refresh
    push(to);
  };

  return (
    <a href={`#${to}`} onClick={handleClick}>
      {children}
    </a>
  );
}

export { Router, Route, Link };
