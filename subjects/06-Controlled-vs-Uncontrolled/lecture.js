import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

function App() {
  return (
    <div>
      <h1>Forms</h1>
      <form>
        <input type="text" />
      </form>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Give the <input> a default value.

// function App() {
//   return (
//     <div>
//       <h1>Forms</h1>
//       <form>
//         <input type="text" defaultValue="cupcakes" />
//       </form>
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Access the value using event.target.

// function App() {
//   function handleChange(event) {
//     console.log(event.target.value);
//   }

//   return (
//     <div>
//       <h1>Forms</h1>
//       <form>
//         <input
//           type="text"
//           defaultValue="cupcakes"
//           onChange={handleChange}
//         />
//       </form>
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Or use a ref.

// function App() {
//   const inputRef = useRef();

//   function handleChange(event) {
//     console.log(inputRef.current.value);
//   }

//   return (
//     <div>
//       <h1>Forms</h1>
//       <form>
//         <input
//           type="text"
//           defaultValue="cupcakes"
//           onChange={handleChange}
//           ref={inputRef}
//         />
//       </form>
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Or you can "control" the <input> and have its value in state.
// What happens if we don't have an `onChange` but provide a value?

// function App() {
//   const [inputValue, setInputValue] = useState("cupcakes");

//   function handleChange(event) {
//     setInputValue(event.target.value);
//   }

//   return (
//     <div>
//       <h1>Forms</h1>
//       <form>
//         <input type="text" value={inputValue} onChange={handleChange} />
//       </form>
//       <div>{inputValue}</div>
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// When it's controlled, we can setState elsewhere and it stays in sync.

// function App() {
//   const [inputValue, setInputValue] = useState("cupcakes");

//   function handleChange(event) {
//     setInputValue(event.target.value);
//   }

//   return (
//     <div>
//       <h1>Forms</h1>
//       <form>
//         <div>
//           <button
//             type="button"
//             onClick={() => setInputValue("changed!")}
//           >
//             Change
//           </button>
//         </div>
//         <input type="text" value={inputValue} onChange={handleChange} />
//       </form>
//       <div>{inputValue}</div>
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Some forms are transactional, so modeling in state isn't necessary, just
// use DOM APIs to access the data, like when you need to save off some data
// somewhere and reset the form, but the values in the form are never
// important to `render`.

// function App() {
//   function handleSubmit(event) {
//     event.preventDefault();
//     const values = serializeForm(event.target, { hash: true });
//     console.log(values);
//   }

//   return (
//     <div>
//       <h1>Forms</h1>
//       <form onSubmit={handleSubmit}>
//         <p>
//           <label>
//             First Name:{" "}
//             <input
//               name="firstName"
//               defaultValue="Michael"
//               type="text"
//             />
//           </label>
//         </p>

//         <p>
//           <label>
//             Last Name:{" "}
//             <input name="lastName" defaultValue="Jackson" type="text" />
//           </label>
//         </p>

//         <p>
//           <button type="submit">Save</button>
//         </p>
//       </form>
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Use-cases:
//
// 1. Transactional forms, don't need anything in state, just use
//    `defaultValue` and `onSubmit`
// 2. Some other part of the app needs the forms state to render,
//    but nothing else needs to manipulate that state (one-way),
//    use <form onChange> and DOM APIs to slurp form values into
//    state
// 3. Multiple parts of the app manipulate the state, changes need
//    to be reflected in the input (two-way), use `value` and
//    `onChange`
