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

const FormContext = React.createContext();

class Form extends React.Component {
  state = { values: {} };

  handleChange = (name, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value
      }
    }));
  };

  handleReset = () => {
    this.setState({ values: {} });
  };

  handleSubmit = () => {
    if (this.props.onSubmit) this.props.onSubmit(this.state.values);
  };

  render() {
    return (
      <FormContext.Provider
        value={{
          change: this.handleChange,
          reset: this.handleReset,
          submit: this.handleSubmit,
          values: this.state.values
        }}
      >
        <div>{this.props.children}</div>
      </FormContext.Provider>
    );
  }
}

class ResetButton extends React.Component {
  static contextType = FormContext;

  render() {
    return (
      <button onClick={this.context.reset}>
        {this.props.children}
      </button>
    );
  }
}

class SubmitButton extends React.Component {
  static contextType = FormContext;

  render() {
    return (
      <button onClick={this.context.submit}>
        {this.props.children}
      </button>
    );
  }
}

class TextInput extends React.Component {
  static contextType = FormContext;

  handleChange = event => {
    this.context.change(this.props.name, event.target.value);
  };

  handleKeyDown = event => {
    if (event.key === "Enter") this.context.submit();
  };

  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
        value={this.context.values[this.props.name] || ""}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

class App extends React.Component {
  handleSubmit = values => {
    console.log(values);
  };

  render() {
    return (
      <div>
        <h1>
          This isn't even my final <code>&lt;Form/&gt;</code>!
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name" />{" "}
            <TextInput name="lastName" placeholder="Last Name" />
          </p>
          <p>
            <ResetButton>Reset</ResetButton>{" "}
            <SubmitButton>Submit</SubmitButton>
          </p>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
