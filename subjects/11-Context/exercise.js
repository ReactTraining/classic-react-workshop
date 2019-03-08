////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> calls the form's `onSubmit` handler
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the form's `onSubmit` handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
////////////////////////////////////////////////////////////////////////////////
import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";

const FormContext = React.createContext();

function Form({ children, onSubmit }) {
  const [formValues, setFormValues] = useState({});

  function handleSubmit() {
    onSubmit(formValues);
  }

  function handleChange(name, value) {
    setFormValues({ ...formValues, [name]: value });
  }

  console.log(formValues);

  return (
    <FormContext.Provider
      value={{
        onSubmit: handleSubmit,
        handleChange
      }}
    >
      <div>{children}</div>
    </FormContext.Provider>
  );
}

function SubmitButton({ children }) {
  const context = useContext(FormContext);
  return <button onClick={() => context.onSubmit()}>{children}</button>;
}

function TextInput({ name, placeholder }) {
  const context = useContext(FormContext);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      context.onSubmit();
    }
  }

  return (
    <input
      type="text"
      onKeyDown={handleKeyDown}
      name={name}
      onChange={event => context.handleChange(name, event.target.value)}
      placeholder={placeholder}
    />
  );
}

function App() {
  function handleSubmit(values) {
    alert("YOU WIN!");
  }

  return (
    <div>
      <h1>
        This isn't even my final <code>&lt;Form/&gt;</code>!
      </h1>

      <Form onSubmit={handleSubmit}>
        <p>
          <TextInput name="firstName" placeholder="First Name" />{" "}
          <TextInput name="lastName" placeholder="Last Name" />
        </p>
        <p>
          <SubmitButton>Submit</SubmitButton>
        </p>
      </Form>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
