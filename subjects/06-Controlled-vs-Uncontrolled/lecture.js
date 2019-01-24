import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

class App extends React.Component {
  handleSubmit = event => {
    event.preventDefault(); // prevent page refresh
    const values = serializeForm(event.target, { hash: true });
    console.log(values);
  };

  state = { firstName: "Michael", lastName: "Jackson" };

  render() {
    return (
      <div>
        <h1>Forms</h1>

        <p>
          <button onClick={() => this.setState({ firstName: "Sarah" })}>
            Set the first name to "Sarah"
          </button>
        </p>

        <p>
          The name is {this.state.firstName} {this.state.lastName}
        </p>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={event =>
              this.setState({ firstName: event.target.value })
            }
          />
          <input
            type="text"
            name="lastName"
            defaultValue="Jackson"
            onChange={event =>
              this.setState({ lastName: event.target.value })
            }
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
