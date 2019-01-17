import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

class App extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    const values = serializeForm(event.target, { hash: true });
    console.log(values);
  };

  state = { firstName: "Michael", lastName: "Jackson" };

  render() {
    return (
      <div>
        <h1>Forms</h1>

        <button onClick={() => this.setState({ firstName: "Richard" })}>
          Set the first name to "Richard"
        </button>

        <p>
          The name is {this.state.firstName} {this.state.lastName}
        </p>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={event => {
              this.setState({ firstName: event.target.value });
            }}
          />
          <input
            type="text"
            name="lastName"
            defaultValue={this.state.lastName}
            onChange={event => {
              this.setState({ lastName: event.target.value });
            }}
          />
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
