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
  static propTypes = {
    onSubmit: PropTypes.func
  };

  values = {}; // Why not state?

  handleSubmit = () => {
    if (this.props.onSubmit) this.props.onSubmit(this.values);
  };

  handleChange = (name, value) => {
    this.values[name] = value;
  };

  render() {
    return (
      <FormContext.Provider
        value={{
          change: this.handleChange,
          submit: this.handleSubmit
        }}
      >
        <div>{this.props.children}</div>
      </FormContext.Provider>
    );
  }
}

// describe('When the <SubmitButton> is clicked', () => {
//   it('submits the form', () => {
//     const handleSubmit = jest.fn();

//     render(
//       <Form onSubmit={handleSubmit}>
//         <SubmitButton>go</SubmitButton>
//       </Form>,
//       node
//     )

//     Simulate.click(node.querySelector('button'));

//     expect(handleSubmit).toHaveBeenCalled();
//   })
// })

class SubmitButton extends React.Component {
  render() {
    return (
      <FormContext.Consumer>
        {form => (
          <button onClick={form.submit}>{this.props.children}</button>
        )}
      </FormContext.Consumer>
    );
  }
}

class TextInput extends React.Component {
  static contextType = FormContext;

  handleKeyDown = event => {
    if (event.key === "Enter") {
      this.context.submit();
    }
  };

  handleChange = event => {
    this.context.change(this.props.name, event.target.value);
  };

  static defaultProps = {
    defaultValue: ""
  };

  componentDidMount() {
    this.context.change(this.props.name, this.props.defaultValue);
  }

  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        defaultValue={this.props.defaultValue}
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
              placeholder="First Name"
              defaultValue="Michael"
            />{" "}
            <TextInput
              name="lastName"
              placeholder="Last Name"
              defaultValue="Jackson"
            />
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
