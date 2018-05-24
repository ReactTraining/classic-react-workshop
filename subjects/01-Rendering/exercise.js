////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render DATA.title in an <h1>
// - Render a <ul> with each of DATA.items as an <li>
// - Now only render an <li> for mexican food (hint: use DATA.items.filter(...))
// - Sort the items in alphabetical order by name (hint: use sort-by https://github.com/staygrimm/sort-by#example)
//
// Got extra time?
//
// - Add a select dropdown to make filtering on `type` dynamic
// - Add a button to toggle the sort order (hint: You'll need an `updateThePage`
//   function that calls `ReactDOM.render`, and then you'll need to call it in
//   the event handlers of the form controls)
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import sortBy from "sort-by";

const DATA = {
  title: "Menu",
  items: [
    { id: 1, name: "tacos", type: "mexican" },
    { id: 2, name: "burrito", type: "mexican" },
    { id: 3, name: "tostada", type: "mexican" },
    { id: 4, name: "mushy peas", type: "english" },
    { id: 5, name: "fish and chips", type: "english" },
    { id: 6, name: "black pudding", type: "english" }
  ]
};

let foodType = "mexican";

function updateFoodType(type) {
  foodType = type;
  ReactDOM.render(<Menu />, document.getElementById("app"));
}

let sortAscending = false;

function toggleSortOrder() {
  sortAscending = !sortAscending;
  ReactDOM.render(<Menu />, document.getElementById("app"));
}

function Menu() {
  const items = DATA.items
    .filter(item => item.type === foodType)
    .sort(sortBy(sortAscending ? "name" : "-name"))
    .map(item => <li key={item.id}>{item.name}</li>);

  return (
    <div>
      <h1>{DATA.title}</h1>
      <select onChange={event => updateFoodType(event.target.value)}>
        <option>mexican</option>
        <option>english</option>
      </select>
      <button onClick={toggleSortOrder}>Toggle sort order</button>
      <ul>{items}</ul>
    </div>
  );
}

ReactDOM.render(<Menu />, document.getElementById("app"));

// require("./tests").run();

// import $ from "jquery";

// let foodType = "mexican";

// function updateFoodType(type) {
//   foodType = type;
//   render();
// }

// function render() {
//   const items = DATA.items
//     .filter(item => item.type === foodType)
//     .sort(sortBy("name"))
//     .map(item => "<li>" + item.name + "</li>");

//   return $("#app").html(
//     "<div><h1>" +
//       DATA.title +
//       "</h1><select><option>mexican</option><option>english</option></select><ul>" +
//       items.join("") +
//       "</ul></div>"
//   );
// }

// function renderItems() {
//   $('ul').html()
// }

// render()
//   .find("select")
//   .on("change", event => {
//     updateFoodType(event.target.value);
//   });
