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
  values = {};

  handleChange = (key, value) => {
    this.values[key] = value;
  };

  handleSubmit = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.values);
    }
  };

  resetHandlers = [];

  addResetHandler = handler => {
    this.resetHandlers.push(handler);

    return () => {
      this.resetHandlers = this.resetHandlers.filter(
        h => h !== handler
      );
    };
  };

  handleReset = () => {
    this.resetHandlers.forEach(handler => handler());
  };

  render() {
    return (
      <FormContext.Provider
        value={{
          change: this.handleChange,
          submit: this.handleSubmit,
          onReset: this.addResetHandler,
          reset: this.handleReset
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

  state = { value: this.props.defaultValue };

  changeValue = value => {
    this.setState({ value });
    this.context.change(this.props.name, value);
  };

  handleChange = event => {
    this.changeValue(event.target.value);
  };

  handleKeyDown = event => {
    if (event.key === "Enter") {
      const form = this.context;
      form.submit();
    }
  };

  handleReset = () => {
    this.changeValue(this.props.defaultValue);
  };

  componentDidMount() {
    this.context.change(this.props.name, this.state.value);
    this.removeResetHandler = this.context.onReset(this.handleReset);
  }

  componentWillUnmount() {
    this.removeResetHandler();
  }

  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        value={this.state.value}
        placeholder={this.props.placeholder}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
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
            <TextInput
              name="firstName"
              defaultValue="Michael"
              placeholder="First Name"
            />{" "}
            <TextInput
              name="lastName"
              defaultValue="Jackson"
              placeholder="Last Name"
            />
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>{" "}
            <ResetButton>Reset</ResetButton>
          </p>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
