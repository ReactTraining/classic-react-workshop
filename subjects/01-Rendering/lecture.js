import React from "react";
import ReactDOM from "react-dom";

////////////////////////////////////////////////////////////////////////////////
// React elements are plain JavaScript objects created with `createElement`
// const element = React.createElement("input");

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// You can also pass in properties and child elements as extra arguments
// const element = React.createElement(
//   "select",
//   { value: "2" },
//   React.createElement("option", { value: "1" }, "one"),
//   React.createElement("option", { value: "2" }, "two"),
//   React.createElement("option", { value: "3" }, "three")
// );

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// And build up more UI
// const element = React.createElement(
//   "div",
//   null,
//   React.createElement(
//     "h1",
//     { className: "hot" },
//     "These are just objects"
//   ),
//   React.createElement(
//     "select",
//     { value: "2" },
//     React.createElement("option", { value: "1" }, "one"),
//     React.createElement("option", { value: "2" }, "two"),
//     React.createElement("option", { value: "3" }, "three")
//   )
// );

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Lets look at one of them in the console
// Don't get upset, `className` is a DOM thing
//console.log(element)

////////////////////////////////////////////////////////////////////////////////
// We can pass in functions as event handlers
// const element = React.createElement(
//   "button",
//   { onClick: () => alert("clicked!") },
//   "alert!"
// );

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Probably more like this
// function handleClick() {
//   alert("clicked some more!");
// }

// const element = React.createElement(
//   "button",
//   { onClick: handleClick },
//   "alert!"
// );

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// You get an event, as you'd expect
// function handleClick(event) {
//   console.log(event.detail);
// }

// const element = React.createElement(
//   "button",
//   { onMouseDown: handleClick },
//   "log button"
// );

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Usually we need to dynamically generate the UI from some data. Let's render
// a list of items generated from an array.
// We don't need any special helpers, just use Array methods!
// const contacts = [
//   { name: "Michael Jackson" },
//   { name: "Taylor Swift" },
//   { name: "Bruce Lee" }
// ];

// const element = React.createElement(
//   "ul",
//   null,
//   contacts.map(contact => React.createElement("li", null, contact.name))
// );

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// What do I mean by "special helpers"? Remember how we did this with mustache?
// import Mustache from "mustache";

// const contacts = [
//   { name: "Michael Jackson" },
//   { name: "Taylor Swift" },
//   { name: "Bruce Lee" }
// ];

// const template = `
//   <ul>
//     {{#contacts}}
//     <li>{{name}}</li>
//     {{/contacts}}
//   </ul>
// `;

// document.getElementById("app").innerHTML = Mustache.render(template, {
//   contacts
// });

////////////////////////////////////////////////////////////////////////////////
// Stuff you need to learn in order to do this in Mustache:
// - {{#contacts}}{{/contacts}} syntax
// - Special scope (can use {{name}} inside loop)

////////////////////////////////////////////////////////////////////////////////
// Let's take this further and assume you want to alert the name when an item
// is clicked. First, in Mustache:
// import Mustache from "mustache";

// const contacts = [
//   { name: "Michael Jackson" },
//   { name: "Taylor Swift" },
//   { name: "Bruce Lee" }
// ];

// const template = `
//   <ul>
//     {{#contacts}}
//     <li>{{name}}</li>
//     {{/contacts}}
//   </ul>
// `;

// document.getElementById("app").innerHTML = Mustache.render(template, {
//   contacts
// });

// document
//   .getElementById("app")
//   .querySelectorAll("li")
//   .forEach(li => {
//     li.addEventListener("click", () => alert(li.innerText));
//   });

// Then, in React:
// const contacts = [
//   { name: "Michael Jackson" },
//   { name: "Taylor Swift" },
//   { name: "Bruce Lee" }
// ];

// const element = React.createElement(
//   "ul",
//   null,
//   contacts.map(contact =>
//     React.createElement(
//       "li",
//       { onClick: () => alert(contact.name) },
//       contact.name
//     )
//   )
// );

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// No way to inject behavior into a template string w/out using globals, so
// we need to add it imperatively afterwards.

////////////////////////////////////////////////////////////////////////////////
// Now let's put a number by each person's name. First, in React:
// const contacts = [
//   { name: "Michael Jackson" },
//   { name: "Taylor Swift" },
//   { name: "Bruce Lee" }
// ];

// const element = React.createElement(
//   "ul",
//   null,
//   contacts.map((contact, index) =>
//     React.createElement(
//       "li",
//       { onClick: () => alert(contact.name) },
//       index + 1 + " " + contact.name
//     )
//   )
// );

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// We can't actually do this in Mustache because I never implemented this
// feature! (yep, I wrote it) There's no way to get the index of the current
// item inside the {{#contacts}}{{/contacts}} block...

////////////////////////////////////////////////////////////////////////////////
// But you miss that nice HTML syntax, right? Well, you're gonna love JSX.
// Every time you see a `createElement` call, you can use HTML tags instead.
// const contacts = [
//   { name: "Michael Jackson" },
//   { name: "Taylor Swift" },
//   { name: "Bruce Lee" }
// ];

// const items = contacts.map((contact, index) => (
//   <li onClick={() => alert(contact.name)}>
//     {index + 1} {contact.name}
//   </li>
// ));

// const element = <ul>{items}</ul>;

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// You can even create your own custom components that encapsulate some markup
// that you use more than once.
// const contacts = [
//   { name: "Michael Jackson" },
//   { name: "Taylor Swift" },
//   { name: "Bruce Lee" }
// ];

// function ContactList() {
//   const items = contacts.map((contact, index) => (
//     <li onClick={() => alert(contact.name)}>
//       {index + 1} {contact.name}
//     </li>
//   ));

//   return <ul>{items}</ul>;
// }

// const element = <ContactList />;

// ReactDOM.render(element, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Because React is generally just a bunch of objects, you don't have to ask
// React how to solve a problem in your app, you can use everything you know
// about programming already.

////////////////////////////////////////////////////////////////////////////////
// - Always re-render
// - Virtual DOM makes it efficient
// - its like PHP but EVEN BETTER
