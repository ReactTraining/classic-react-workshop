var mustache = require("mustache");

var template = `
<h1>Contacts</h1>
{{#contacts}}
  <div>{{index}} {{firstName}} {{#upcase}}{{lastName}}{{/upcase}}</div>
{{/contacts}}
`;

var view = {
  contacts: [
    { firstName: "Michael", lastName: "Jackson" },
    { firstName: "Taylor", lastName: "Swift" },
    { firstName: "Jeff", lastName: "Bezos" }
  ],
  upcase: function() {
    return function(text, render) {
      return render(text).toUpperCase();
    };
  }
};

var node = document.getElementById("app");

// node.innerHTML = mustache.render(template, view);

import React from "react";
import ReactDOM from "react-dom";

function ContactList() {
  const element = (
    <div>
      <h1 className="hot">Contacts</h1>
      {view.contacts.map((contact, index) => (
        <div key={index}>
          {index + 1} {contact.firstName}{" "}
          {contact.lastName.toUpperCase()}
        </div>
      ))}
    </div>
  );

  return element;
}
// debugger;

ReactDOM.render(<ContactList />, node);
