import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

class App extends React.Component {
  state = { firstName: "Michael" };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Forms</h1>

        <p>
          <button onClick={() => this.setState({ firstName: "Tyler" })}>
            Set the first name to "Tyler"
          </button>
        </p>

        <input
          type="text"
          value={this.state.firstName}
          onChange={event =>
            this.setState({ firstName: event.target.value })
          }
        />

        <input type="text" defaultValue={this.state.firstName} />
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
