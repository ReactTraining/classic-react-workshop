// MVC = Model, View, Controller

import React from "react";
import ReactDOM from "react-dom";

// var element = React.createElement("div", { className: "hot" });
// var element = <div className="hot" />;
// debugger;

function ItemList() {
  var data = ["one", "two", "three"];

  return (
    <div className="hot">
      <select
        onChange={event => {
          console.log(event.target.value);
        }}
      >
        {data.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

ReactDOM.render(<ItemList />, document.getElementById("app"));
