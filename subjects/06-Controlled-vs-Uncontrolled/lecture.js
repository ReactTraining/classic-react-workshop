import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

class App extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const values = serializeForm(form, { hash: true });
    console.log(values);
  };

  state = { firstName: "Michael" };

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

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={event =>
              this.setState({ firstName: event.target.value })
            }
          />
          <input type="text" name="lastName" defaultValue="Jackson" />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
