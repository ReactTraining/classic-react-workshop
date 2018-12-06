import React from "react";
import ReactDOM from "react-dom";

function ContactList(props) {
  return (
    <ul
      className="hot"
      onClick={() => {
        alert("you win");
      }}
    >
      {props.contacts.map((contact, index) => (
        <li key={index}>{contact}</li>
      ))}
    </ul>
  );
}

const contacts = ["Michael Jackson", "Taylor Swift", "Trent Reznor"];
const element = <ContactList contacts={contacts} />;
// debugger;

ReactDOM.render(element, document.getElementById("app"));
