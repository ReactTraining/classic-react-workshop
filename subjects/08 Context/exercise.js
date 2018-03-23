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
  static propTypes = {
    onSubmit: PropTypes.func
  };

  static childContextTypes = {
    form: PropTypes.shape({
      change: PropTypes.func.isRequired,
      submit: PropTypes.func.isRequired,
      reset: PropTypes.func.isRequired
    }).isRequired
  };

  values = {};
  resetListeners = [];

  getChildContext() {
    return {
      form: {
        change: (name, value) => {
          this.values[name] = value;
        },
        submit: () => {
          if (this.props.onSubmit) {
            this.props.onSubmit(this.values);
          }
        },
        reset: () => {
          this.resetListeners.forEach(listener => listener());
        },
        addResetListener: listener => {
          this.resetListeners.push(listener);
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
    }).isRequired
  };

  render() {
    return (
      <button onClick={this.context.form.submit}>
        {this.props.children}
      </button>
    );
  }
}

class TextInput extends React.Component {
  static contextTypes = {
    form: PropTypes.shape({
      change: PropTypes.func.isRequired,
      submit: PropTypes.func.isRequired,
      addResetListener: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    value: this.props.defaultValue
  };

  handleKeyDown = event => {
    if (event.key === "Enter") {
      this.context.form.submit();
    }
  };

  handleChange = event => {
    this.setState({ value: event.target.value }, () => {
      this.context.form.change(this.props.name, this.state.value);
    });
  };

  handleReset = () => {
    this.setState({ value: this.props.defaultValue });
  };

  componentDidMount() {
    this.context.form.change(this.props.name, this.props.defaultValue);
    this.context.form.addResetListener(this.handleReset);
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

class ResetButton extends React.Component {
  static contextTypes = {
    form: PropTypes.shape({
      reset: PropTypes.func.isRequired
    }).isRequired
  };

  render() {
    return (
      <button onClick={this.context.form.reset}>
        {this.props.children}
      </button>
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
