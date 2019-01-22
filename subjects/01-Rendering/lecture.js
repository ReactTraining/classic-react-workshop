import React from "react";
import ReactDOM from "react-dom";

const contacts = ["Michael Jackson", "Kanye West", "Taylor Swift"];

function ContactList() {
  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {contacts.map((name, index) => (
          <li key={index}>
            {name} is contact # {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(<ContactList />, document.getElementById("app"));
