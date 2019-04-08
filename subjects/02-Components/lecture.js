import "./styles.css";

import React, { useState } from "react";
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
// this code to use a JavaScript class that extends React.Component.

//////////////////////////////////////////////////////////////////////////////////
// React gives us useState and automatically re-renders as the state changes.

// function ContentToggle() {
//   const [isOpen, setIsOpen] = useState(false);

//   function handleClick() {
//     setIsOpen(!isOpen);
//   }

//   let summaryClassName = "content-toggle-summary";

//   if (isOpen) {
//     summaryClassName += " content-toggle-summary-open";
//   }

//   return (
//     <div className="content-toggle">
//       <button onClick={handleClick} className={summaryClassName}>
//         Tacos
//       </button>
//       {isOpen && (
//         <div className="content-toggle-details">
//           <p>
//             A taco is a traditional Mexican dish composed of a corn or
//             wheat tortilla folded or rolled around a filling.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// ReactDOM.render(<ContentToggle />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Let's make <ContentToggle> re-usable and render a few of them. The `summary`
// and `children` are props we can pass in.

// function ContentToggle({ summary, children }) {
//   const [isOpen, setIsOpen] = useState(false);

//   function handleClick() {
//     setIsOpen(!isOpen);
//   }

//   let summaryClassName = "content-toggle-summary";

//   if (isOpen) {
//     summaryClassName += " content-toggle-summary-open";
//   }

//   return (
//     <div className="content-toggle">
//       <button onClick={handleClick} className={summaryClassName}>
//         {summary}
//       </button>
//       {isOpen && (
//         <div className="content-toggle-details">{children}</div>
//       )}
//     </div>
//   );
// }

// ReactDOM.render(
//   <div>
//     <ContentToggle summary="Tacos">
//       <p>
//         A taco is a traditional Mexican dish composed of a corn or wheat
//         tortilla folded or rolled around a filling.
//       </p>
//     </ContentToggle>
//     <ContentToggle summary="Burritos">
//       <p>A burrito is like a taco, but bigger.</p>
//     </ContentToggle>
//   </div>,
//   document.getElementById("app")
// );

////////////////////////////////////////////////////////////////////////////////
// Wrap a few <ContentToggle>s in a <ToggleTracker> that tracks the # of times
// it has been toggled and shows a counter. <ContentToggle> gets an onToggle
// handler. This is like a "custom event".

// function ContentToggle({ summary, onToggle, children }) {
//   const [isOpen, setIsOpen] = useState(false);

//   function handleClick() {
//     setIsOpen(!isOpen);

//     if (onToggle) {
//       onToggle();
//     }
//   }

//   let summaryClassName = "content-toggle-summary";

//   if (isOpen) {
//     summaryClassName += " content-toggle-summary-open";
//   }

//   return (
//     <div className="content-toggle">
//       <button onClick={handleClick} className={summaryClassName}>
//         {summary}
//       </button>
//       {isOpen && (
//         <div className="content-toggle-details">{children}</div>
//       )}
//     </div>
//   );
// }

// function ToggleTracker() {
//   const [numToggles, setNumToggles] = useState(0);

//   function incrementToggles() {
//     setNumToggles(numToggles + 1);
//   }

//   return (
//     <div>
//       <p>The total number of toggles is: {numToggles}</p>

//       <ContentToggle summary="Tacos" onToggle={incrementToggles}>
//         <p>
//           A taco is a traditional Mexican dish composed of a corn or
//           wheat tortilla folded or rolled around a filling.
//         </p>
//       </ContentToggle>
//       <ContentToggle summary="Burritos" onToggle={incrementToggles}>
//         <p>A burrito is like a taco, but bigger.</p>
//       </ContentToggle>
//     </div>
//   );
// }

// ReactDOM.render(<ToggleTracker />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// We can use propTypes to declare the name, type, and even default value of
// our props. These are like "runnable docs" for our code.
