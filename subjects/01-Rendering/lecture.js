import React from "react";
import ReactDOM from "react-dom";

const contacts = [
  { id: 0, name: "Michael Jackson" },
  { id: 1, name: "Bruce Willis" },
  { id: 2, name: "Taylor Swift" }
];

const node = document.getElementById("app");

/*
<div class="hot">
  <div v-for="contact in contacts">{{name}}</div>
</div>
*/

const element = (
  <div className="hot">
    {contacts.map(contact => (
      <div key={contact.id} onClick={() => console.log(contact.name)}>
        {contact.name}
      </div>
    ))}
  </div>
);
// debugger;

ReactDOM.render(element, node);
