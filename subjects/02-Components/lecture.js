import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";

let isOpen = false;

function handleClick() {
  isOpen = !isOpen;
  updateThePage();
}

function ContentToggle() {
  let summaryClassName = "content-toggle-summary";

  if (isOpen) {
    summaryClassName += " content-toggle-summary-open";
  }

  return (
    <div className="content-toggle">
      <button onClick={handleClick} className={summaryClassName}>
        Tacos
      </button>
      {isOpen && (
        <div className="content-toggle-details">
          <p>
            A taco is a traditional Mexican dish composed of a corn or
            wheat tortilla folded or rolled around a filling.
          </p>
        </div>
      )}
    </div>
  );
}

function updateThePage() {
  ReactDOM.render(<ContentToggle />, document.getElementById("app"));
}

updateThePage();

////////////////////////////////////////////////////////////////////////////////
// What happens when we want to render 2 <ContentToggle>s? Shared mutable state!

////////////////////////////////////////////////////////////////////////////////
// React gives us a component model we can use to encapsulate state at the
// instance level, so each component instance has its own state. Let's refactor
// this code to use React components.

////////////////////////////////////////////////////////////////////////////////
// First, encapsulate the state in an object. Then, add a setState function that
// we can use to update state and automatically update the page any time it
// changes.

//////////////////////////////////////////////////////////////////////////////////
// React gives us setState and automatically re-renders as the state changes.

////////////////////////////////////////////////////////////////////////////////
// Let's make <ContentToggle> re-usable and render a few of them. Title and
// children are properties we can pass in from the parent component.

////////////////////////////////////////////////////////////////////////////////
// Wrap a few <ContentToggle>s in a <ToggleTracker> that tracks the # of times
// it has been toggled and shows a counter. <ContentToggle> gets an onToggle
// handler. This is like a "custom event".

////////////////////////////////////////////////////////////////////////////////
// We can use propTypes to declare the name, type, and even default value of
// our props. These are like "runnable docs" for our code.
