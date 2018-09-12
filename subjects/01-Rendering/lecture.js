import React from "react";
import ReactDOM from "react-dom";

import Mustache from "mustache";

const node = document.getElementById("app");

const contacts = [
  { id: 1, firstName: "Michael", lastName: "Jackson" },
  { id: 2, firstName: "Kanye", lastName: "West" },
  { id: 3, firstName: "Kim", lastName: "Kardashian" }
];

// const template = `
// <h1>Contacts</h1>
// <ul>
//   {{#contacts}}
//     <li>{{firstName}} {{#upcase}}{{lastName}}{{/upcase}}</li>
//   {{/contacts}}
// </ul>
// `;

// node.innerHTML = Mustache.render(template, {
//   contacts,
//   upcase: function() {
//     return function(text, render) {
//       return render(text).toUpperCase();
//     };
//   }
// });

// JSX - Convert createElement => HTML tags
// let div;
// div = React.createElement("div", { className: 'hot' });
// div = <div />;
// debugger;

function ContactList(props) {
  const element = (
    <div className="hot">
      <h1>Contacts</h1>
      <ul>
        {props.contacts.map((contact, index) => (
          <li key={index}>
            {contact.firstName} {contact.lastName.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );

  return element;
}

// debugger;

ReactDOM.render(<ContactList contacts={contacts} />, node);
