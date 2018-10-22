import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

class App extends React.Component {
  handleSubmit = event => {
    event.preventDefault(); // Prevent page refresh
    var form = event.target;
    var values = serializeForm(form, { hash: true });
    console.log(values);
  };

  state = { firstName: "Michael", lastName: "Jackson" };

  render() {
    return (
      <div>
        <h1>Forms</h1>

        <p>
          <button
            onClick={() => this.setState({ firstName: "Taylor" })}
          >
            Set the first name to "Taylor"
          </button>
        </p>

        <p>
          The name is {this.state.firstName} {this.state.lastName}
        </p>

        <form onSubmit={this.handleSubmit}>
          <input
            name="firstName"
            type="text"
            value={this.state.firstName}
            onChange={event =>
              this.setState({ firstName: event.target.value })
            }
          />
          <input name="lastName" type="text" defaultValue="Jackson" />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
