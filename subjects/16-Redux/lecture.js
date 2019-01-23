import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";

// redux = reduce + flux

function add(amount) {
  return { type: "add", amount };
}

function sub(amount) {
  return { type: "sub", amount };
}

function count(state = 0, action) {
  if (action.type === "add") {
    return state + action.amount;
  } else if (action.type === "sub") {
    return state - action.amount;
  }

  return state;
}

function addTodo(todo) {
  return { type: "add_todo", todo };
}

function todos(state = [], action) {
  if (action.type === "add_todo") {
    return state.concat(action.todo);
  }

  return state;
}

const reducer = combineReducers({ count, todos });

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(add(3));
store.dispatch(add(4));
store.dispatch(sub(2));

store.dispatch(addTodo("go swimming"));

import React from "react";
import ReactDOM from "react-dom";

function App({ count, dispatch }) {
  return (
    <div>
      <h1>The count is {count}</h1>
      <button onClick={() => dispatch(add(1))}>add 1</button>
      <button onClick={() => dispatch(sub(1))}>sub 1</button>
    </div>
  );
}

function mapStateToProps(state) {
  return { count: state.count };
}

const ConnectedApp = connect(mapStateToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <ConnectedApp />
      <ConnectedApp />
    </div>
  </Provider>,
  document.getElementById("app")
);
