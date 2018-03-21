import React from "react";
import ReactDOM from "react-dom";

const node = document.getElementById("app");

const people = [
  { firstName: "Michael", lastName: "Jackson" },
  { firstName: "Bruce", lastName: "Lee" },
  { firstName: "Diana", lastName: "Ross" }
];

function PeopleList(props) {
  const people = props.people;

  return (
    <ul className={props.className}>
      {people.map((person, index) => (
        <li>
          {index + 1} {person.firstName} {person.lastName}
        </li>
      ))}
    </ul>
  );
}

const element = <PeopleList className="hot" people={people} />;

ReactDOM.render(element, node);
