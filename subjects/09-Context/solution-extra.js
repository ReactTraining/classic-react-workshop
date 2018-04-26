////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> calls <Form onSubmit>
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onSubmit> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Form extends React.Component {
  static childContextTypes = {
    form: PropTypes.shape({
      values: PropTypes.object.isRequired,
      addField: PropTypes.func.isRequired,
      change: PropTypes.func.isRequired,
      submit: PropTypes.func.isRequired,
      reset: PropTypes.func.isRequired
    })
  };

  defaultValues = {};

  state = {
    values: {}
  };

  getValues() {
    return Object.assign({}, this.defaultValues, this.state.values);
  }

  getChildContext() {
    return {
      form: {
        values: this.getValues(),
        addField: (name, defaultValue) => {
          this.defaultValues[name] = defaultValue;
        },
        change: (name, value) => {
          this.setState(state => ({
            values: {
              ...state.values,
              [name]: value
            }
          }));
        },
        submit: () => {
          if (this.props.onSubmit)
            this.props.onSubmit(this.getValues());
        },
        reset: () => {
          this.setState({ values: {} });
        }
      }
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

class SubmitButton extends React.Component {
  static contextTypes = {
    form: PropTypes.shape({
      submit: PropTypes.func.isRequired
    })
  };

  render() {
    return (
      <button onClick={this.context.form.submit}>
        {this.props.children}
      </button>
    );
  }
}

class ResetButton extends React.Component {
  static contextTypes = {
    form: PropTypes.shape({
      reset: PropTypes.func.isRequired
    })
  };

  render() {
    return (
      <button onClick={this.context.form.reset}>
        {this.props.children}
      </button>
    );
  }
}

class TextInput extends React.Component {
  static defaultProps = {
    defaultValue: ""
  };

  static contextTypes = {
    form: PropTypes.shape({
      values: PropTypes.object.isRequired,
      addField: PropTypes.func.isRequired,
      change: PropTypes.func.isRequired,
      submit: PropTypes.func.isRequired
    })
  };

  componentWillMount() {
    this.context.form.addField(
      this.props.name,
      this.props.defaultValue
    );
  }

  handleChange = event => {
    this.context.form.change(this.props.name, event.target.value);
  };

  handleKeyDown = event => {
    if (event.key === "Enter") this.context.form.submit();
  };

  render() {
    const value = this.context.form.values.hasOwnProperty(
      this.props.name
    )
      ? this.context.form.values[this.props.name]
      : this.props.defaultValue;

    return (
      <input
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        value={value}
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
            <ResetButton>Reset</ResetButton>
          </p>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
