import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

class App extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    const values = serializeForm(event.target, { hash: true });
    console.log(values);
  };

  state = {
    firstName: "Michael"
  };

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
            readOnly
          />
          <input type="text" name="lastName" defaultValue="Jackson" />
          <button>Go</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
