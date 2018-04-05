import React from "react";
import ReactDOM from "react-dom";

const contacts = [
  { id: 0, name: "Michael Jackson" },
  { id: 1, name: "Bruce Lee" },
  { id: 2, name: "Diana Ross" },
  { id: 3, name: "Mariah Carey" }
];

const element = (
  <div>
    <h1>Contacts</h1>
    {contacts.map((contact, index) => (
      <div
        style={{
          backgroundColor: index % 2 ? "white" : "#eee"
        }}
        key={contact.id}
      >
        {contact.name}
      </div>
    ))}
  </div>
);
const node = document.getElementById("app");
// debugger;

ReactDOM.render(element, node);
