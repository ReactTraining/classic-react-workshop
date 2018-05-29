import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { createStore } from "redux";
import { Provider, connect } from "react-redux";

const reducer = (state = 0, action) => {
  if (action.type === "INC_COUNT") {
    return state + action.by;
  } else if (action.type === "DEC_COUNT") {
    return state - action.by;
  }

  return state;
};

const store = createStore(reducer);

// store.subscribe(() => {
//   console.log(store.getState());
// });

// store.dispatch({ type: "INC_COUNT", by: 10 });
// store.dispatch({ type: "INC_COUNT", by: 10 });
// store.dispatch({ type: "INC_COUNT", by: 10 });
// store.dispatch({ type: "INC_COUNT", by: 10 });
// store.dispatch({ type: "INC_COUNT", by: 10 });

class OriginalApp extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to the app!</h1>

        <p>The count is {this.props.count}</p>

        <button
          onClick={() =>
            this.props.dispatch({
              type: "INC_COUNT",
              by: 1
            })
          }
        >
          inc
        </button>
        <button
          onClick={() =>
            this.props.dispatch({
              type: "DEC_COUNT",
              by: 1
            })
          }
        >
          dec
        </button>

        <One />
      </div>
    );
  }
}

OriginalApp.propTypes = {
  count: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { count: state };
}

const App = connect(mapStateToProps)(OriginalApp);

function One() {
  return (
    <div>
      <h2>The second level down</h2>
      <Two />
    </div>
  );
}

function OriginalTwo({ count }) {
  return (
    <div>
      <h3>The 3rd level down</h3>
      <p>The count is {typeof count === "number" ? count : "???"}</p>
    </div>
  );
}

function mapStateToProps(state) {
  return { count: state };
}

const Two = connect(mapStateToProps)(OriginalTwo);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
