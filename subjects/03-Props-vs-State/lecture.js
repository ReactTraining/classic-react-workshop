import "./styles.css";

import React, { useState } from "react";
import ReactDOM from "react-dom";

function ContentToggle({ summary, onToggle, children }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
    if (onToggle) onToggle(!isOpen);
  }

  let summaryClassName = "content-toggle-summary";

  if (isOpen) {
    summaryClassName += " content-toggle-summary-open";
  }

  return (
    <div className="content-toggle">
      <button onClick={handleClick} className={summaryClassName}>
        {summary}
      </button>
      {isOpen && (
        <div className="content-toggle-details">{children}</div>
      )}
    </div>
  );
}

import carnitas from "./images/carnitas.png";
import pollo from "./images/pollo.png";
import asada from "./images/asada.png";

function App() {
  const [tacos, setTacos] = useState([
    { id: 0, name: "Carnitas", src: carnitas },
    { id: 1, name: "Pollo", src: pollo },
    { id: 2, name: "Asada", src: asada }
  ]);

  return (
    <div>
      <div>
        {tacos.map(taco => (
          <ContentToggle
            key={taco.name}
            style={{ width: 300 }}
            summary={taco.name}
          >
            <div
              style={{
                height: 200,
                margin: 10,
                background: `url(${taco.src})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain"
              }}
            />
          </ContentToggle>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////
// But what about when we add this feature to the <App>?
// <button>Toggle All</button>
// Watch the state move up to the <App>!

// function ContentToggle({ summary, onToggle, isOpen, children }) {
//   function handleClick() {
//     if (onToggle) onToggle(!isOpen);
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

// import carnitas from "./images/carnitas.png";
// import pollo from "./images/pollo.png";
// import asada from "./images/asada.png";

// function App() {
//   const [tacos, setTacos] = useState([
//     { id: 0, name: "Carnitas", src: carnitas },
//     { id: 1, name: "Pollo", src: pollo },
//     { id: 2, name: "Asada", src: asada }
//   ]);

//   const [open, setOpen] = useState([false, false, false]);

//   function toggleAll() {
//     setOpen(open.map(o => !o));
//   }

//   function toggleTaco(index, isOpen) {
//     setOpen(open.map((o, i) => (i === index ? isOpen : o)));
//   }

//   return (
//     <div>
//       <button onClick={toggleAll}>Toggle All</button>

//       <div>
//         {tacos.map((taco, index) => (
//           <ContentToggle
//             key={taco.name}
//             style={{ width: 300 }}
//             summary={taco.name}
//             isOpen={open[index]}
//             onToggle={isOpen => toggleTaco(index, isOpen)}
//           >
//             <div
//               style={{
//                 height: 200,
//                 margin: 10,
//                 background: `url(${taco.src})`,
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//                 backgroundSize: "contain"
//               }}
//             />
//           </ContentToggle>
//         ))}
//       </div>
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));

//////////////////////////////////////////////////////////////////////////////
// This is cool, until we realize that the "toggle" button should probably be
// an open/close button. Nobody *really* wants a "Toggle All" button! Replace
// it with a "Open All"/"Close All" button.

// function ContentToggle({ summary, onToggle, isOpen, children }) {
//   function handleClick() {
//     if (onToggle) onToggle(!isOpen);
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

// import carnitas from "./images/carnitas.png";
// import pollo from "./images/pollo.png";
// import asada from "./images/asada.png";

// function App() {
//   const [tacos, setTacos] = useState([
//     { id: 0, name: "Carnitas", src: carnitas },
//     { id: 1, name: "Pollo", src: pollo },
//     { id: 2, name: "Asada", src: asada }
//   ]);

//   const [open, setOpen] = useState([false, false, false]);

//   function toggleAll(isOpen) {
//     setOpen(open.map(o => isOpen));
//   }

//   function toggleTaco(index, isOpen) {
//     setOpen(open.map((o, i) => (i === index ? isOpen : o)));
//   }

//   const allOpen = open.every(o => o === true);

//   return (
//     <div>
//       <button onClick={() => toggleAll(!allOpen)}>
//         {allOpen ? "Close" : "Open"} All
//       </button>

//       <div>
//         {tacos.map((taco, index) => (
//           <ContentToggle
//             key={taco.name}
//             style={{ width: 300 }}
//             summary={taco.name}
//             isOpen={open[index]}
//             onToggle={isOpen => toggleTaco(index, isOpen)}
//           >
//             <div
//               style={{
//                 height: 200,
//                 margin: 10,
//                 background: `url(${taco.src})`,
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//                 backgroundSize: "contain"
//               }}
//             />
//           </ContentToggle>
//         ))}
//       </div>
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));

//////////////////////////////////////////////////////////////////////////////
// - We didn't really get rid of state, we just pushed it up a level
// - got rid of synchronizing state :)
// - component is super simple, just a function of its props
//
// But its not as portable anymore
// - Must implement `onToggle` :\
// - Must manage state in the owner, always :\
//
// We can create a stateful component that wraps our pure component.

// function StatefulContentToggle(props) {
//   const [open, setOpen] = useState(false);
//   return <ContentToggle {...props} isOpen={open} onToggle={setOpen} />;
// }

////////////////////////////////////////////////////////////////////////////////
// This is a huge deal. This is composition, instead of inheritance. You don't
// inherit from base classes, you compose by wrapping, just like you compose
// functions, call one inside of another
