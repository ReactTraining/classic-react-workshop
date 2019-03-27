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

  const handleSubmit = () => {
    onSubmit(formValues);
  };

  const onChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <FormContext.Provider
        value={{ handleSubmit, onChange, formValues }}
      >
        {children}
      </FormContext.Provider>
    </div>
  );
}

function SubmitButton({ children }) {
  const { handleSubmit } = useContext(FormContext);
  return <button onClick={handleSubmit}>{children}</button>;
}

function TextInput({ name, placeholder }) {
  const { handleSubmit, onChange, formValues } = useContext(
    FormContext
  );

  return (
    <input
      onKeyDown={e => {
        if (e.key === "Enter") handleSubmit();
      }}
      onChange={e => {
        onChange(name, e.target.value);
      }}
      value={formValues[name] || ""}
      type="text"
      name={name}
      placeholder={placeholder}
    />
  );
}

function App() {
  function handleSubmit(values) {
    console.log(values);
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
