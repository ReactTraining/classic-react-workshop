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
import React, { useContext } from "react";
import ReactDOM from "react-dom";

function Form({ children }) {
  return <div>{children}</div>;
}

function SubmitButton({ children }) {
  return <button>{children}</button>;
}

function TextInput({ name, placeholder }) {
  return <input type="text" name={name} placeholder={placeholder} />;
}

function App() {
  function handleSubmit() {
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
