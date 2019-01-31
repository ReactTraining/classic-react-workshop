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
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useContext } from "react";

const FormContext = React.createContext();

class Form extends React.Component {
  values = {};

  handleChange = (name, value) => {
    this.values[name] = value;
    if (this.props.onChange) {
      this.props.onChange(this.values);
    }
  };

  handleSubmit = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.values);
    }
  };

  render() {
    return (
      <FormContext.Provider
        value={{ submit: this.handleSubmit, change: this.handleChange }}
      >
        <div>{this.props.children}</div>
      </FormContext.Provider>
    );
  }
}

function SubmitButton({ children }) {
  const { submit } = useContext(FormContext);
  return <button onClick={submit}>{children}</button>;
}

function TextInput({ name, placeholder }) {
  const { submit, change } = useContext(FormContext);

  const handleChange = event => {
    change(name, event.target.value);
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      submit();
    }
  };

  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  );
}

class App extends React.Component {
  handleSubmit = values => {
    console.log(values);
  };

  handleChange = values => {
    console.log(values);
  };

  render() {
    return (
      <div>
        <h1>
          This isn't even my final <code>&lt;Form/&gt;</code>!
        </h1>

        <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
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
}

ReactDOM.render(<App />, document.getElementById("app"));
