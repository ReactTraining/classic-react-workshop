import React from "react";
import ReactDOM from "react-dom";

////////////////////////////////////////////////////////////////////////////////
// React components are really just functions that take attributes
// const element = React.DOM.input({ type: "text" });

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// You can also pass in children as extra arguments
// const element = React.DOM.select(
//   { value: "2" },
//   React.DOM.option({ value: "1" }, "one"),
//   React.DOM.option({ value: "2" }, "two"),
//   React.DOM.option({ value: "3" }, "three")
// );

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// And build up more UI
// const { div, select, option, h1 } = React.DOM;

// const element = div(
//   {},
//   h1({ className: "hot" }, "These are just functions"),
//   select(
//     { value: "2" },
//     option({ value: "1" }, "one"),
//     option({ value: "2" }, "two"),
//     option({ value: "3" }, "three")
//   )
// );

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// lets look at one of them in the console
// don't get upset, `className` is a DOM thing
//console.log(element)

////////////////////////////////////////////////////////////////////////////////
// can pass in functions as event handlers
// const element = React.DOM.button(
//   { onClick: () => alert("clicked!") },
//   "alert!"
// );

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// probably more like this
// function handleClick() {
//   alert("clicked some more!");
// }

// const element = React.DOM.button({ onClick: handleClick }, "alert!");

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// you get an event, as you'd expect
// function handleClick() {
//   console.log(event.button);
// }

// const element = React.DOM.button(
//   { onMouseDown: handleClick },
//   "log button"
// );

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// JSX is simply different syntax for calling functions
// const element = (
//   <div className="App">
//     <h1 className="Title">Hello!</h1>
//     <p>Pork Carnitas street tacos are the best</p>
//   </div>
// );

// const { div, h1, p } = React.DOM;
// const element = div(
//   { className: "App" },
//   h1({ className: "Title" }, "Hello!"),
//   p({}, "Pork Carnitas street tacos are the best")
// );

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// no special template syntax/helpers, just use Array methods on lists
// const tacos = [
//   { name: "Carnitas" },
//   { name: "Pollo" },
//   { name: "Asada" }
// ];

// const items = tacos.map(taco => <li>{taco.name}</li>);

// ReactDOM.render(<ul>{items}</ul>, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// lets say we want to generate this HTML
// <select name="month">
//   <option>(01) January</option>
//   <option>(02) February</option>
//   ...
// </select>

// in angular we'd have something like this:
// <select name="month">
//   <option ng-repeat="month in months">
//     ({{$index | padMonth}}) {{month}}
//   </option>
// </select>

// Things you have to learn to make this work:
// - ng-repeat
// - `month in months` DSL
// - auto-injected `$index`
// - that `|` is called a filter so you can google to learn...
// - ... how to create a filter

// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December"
// ];

// function padMonth(index) {
//   const realIndex = index + 1;
//   return realIndex > 9 ? "" + realIndex : "0" + realIndex;
// }

// ReactDOM.render(
//   <select>
//     {months.map((month, index) => (
//       <option>
//         ({padMonth(index)}) {month}
//       </option>
//     ))}
//   </select>,
//   document.getElementById("app")
// );

// Things you have to know
// - JavaScript
// - JSX ... or not

// const { select, option } = React.DOM;
// ReactDOM.render(
//   select(
//     {},
//     months.map((month, index) =>
//       option({}, `(${padMonth(index)}) ${month}`)
//     )
//   ),
//   document.getElementById("app")
// );

////////////////////////////////////////////////////////////////////////////////
// Because React is generally just a bunch of functions, you don't have to ask
// React how to solve a problem in your app, you can use everything you know
// about programming already.
// function monthOption(month, index) {
//   return (
//     <option>
//       ({padMonth(index)}) {month})
//     </option>
//   );
// }

// function MonthSelect() {
//   return <select>{months.map(monthOption)}</select>;
// }

// ReactDOM.render(<MonthSelect />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// - Always re-render
// - Virtual DOM makes it efficient
// - its like PHP but EVEN BETTER
