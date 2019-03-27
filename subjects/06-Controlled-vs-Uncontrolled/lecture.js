import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

function App() {
  const [value, setValue] = useState("test");

  const handleChange = event => {
    setValue(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(value);
  };

  return (
    <div>
      <h1>Forms</h1>
      <button onClick={() => setValue("Brad")}>Change to Brad</button>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange} />
      </form>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
