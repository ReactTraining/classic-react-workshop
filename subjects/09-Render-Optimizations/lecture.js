import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

function TodoItem({ body }) {
  const [done, setDone] = useState(false);

  return (
    <li>
      <label>
        <input
          type="checkbox"
          onChange={event => setDone(event.target.checked)}
        />{" "}
        <strong>
          <span style={{ textTransform: "uppercase" }}>todo:</span>{" "}
        </strong>
        <span
          style={{
            color: "blue",
            textDecoration: done ? "line-through" : "none"
          }}
        >
          {body}
        </span>
      </label>
    </li>
  );
}

function TodoList({ initialLength }) {
  const inputRef = useRef();

  const initialItems = Array.from(new Array(initialLength)).map(
    (_, index) => ({
      id: index,
      body: `item ${index + 1}`
    })
  );

  const [items, setItems] = useState(initialItems);

  function handleSubmit(event) {
    event.preventDefault();

    const item = {
      id: items.length,
      body: inputRef.current.value
    };

    event.target.reset();
    setItems([item].concat(items));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} />
      </form>
      <ul>
        {items.map(item => (
          <TodoItem key={item.id} body={item.body} />
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(
  <TodoList initialLength={100} />,
  document.getElementById("app")
);

///////////////////////////////////////////////////////////////////////////////
// Rendering large lists can be super slow. This is an old UI problem.

///////////////////////////////////////////////////////////////////////////////
// One possible solution is to only render the stuff that's actually in the
// view. Native mobile frameworks have been doing this for years:
//
// https://developer.apple.com/library/ios/documentation/UIKit/Reference/UITableView_Class/index.html

///////////////////////////////////////////////////////////////////////////////
// I'd really like to do this in my web app! What does it look like when we
// try to do this with imperative JavaScript?
//
// https://github.com/airbnb/infinity
// https://github.com/emberjs/list-view
