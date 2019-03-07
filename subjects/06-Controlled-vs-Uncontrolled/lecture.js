import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

function App() {
  const [formState, setFormState] = useState({
    name: "",
    email: ""
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log("here");
  }

  return (
    <div>
      <h1>Forms</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formState.name}
          onChange={e => setNameValue(e.target.value)}
        />
        <input type="text" name="email" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
