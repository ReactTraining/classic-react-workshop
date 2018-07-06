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
  handleSubmit = () => {
    if (this.props.onSubmit) this.props.onSubmit();
  };

  render() {
    return (
      <FormContext.Provider
        value={{
          submit: this.handleSubmit
        }}
      >
        <div>{this.props.children}</div>
      </FormContext.Provider>
    );
  }
}

class SubmitButton extends React.Component {
  render() {
    return (
      <FormContext.Consumer>
        {context => (
          <button onClick={context.submit}>
            {this.props.children}
          </button>
        )}
      </FormContext.Consumer>
    );
  }
}

class TextInput extends React.Component {
  render() {
    return (
      <FormContext.Consumer>
        {context => (
          <input
            type="text"
            name={this.props.name}
            placeholder={this.props.placeholder}
            onKeyDown={event => {
              if (event.key === "Enter") context.submit();
            }}
          />
        )}
      </FormContext.Consumer>
    );
  }
}

class App extends React.Component {
  handleSubmit = () => {
    alert("YOU WIN!");
  };

  render() {
    return (
      <div>
        <h1>
          This isn’t even my final <code>&lt;Form/&gt;</code>!
        </h1>

        <Form onSubmit={this.handleSubmit}>
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
