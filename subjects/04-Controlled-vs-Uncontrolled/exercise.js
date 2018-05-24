////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

class CheckoutForm extends React.Component {
  state = {
    billingName: "Michael Jackson",
    billingState: "CA",
    shippingName: "Taylor Swift",
    shippingState: "TN",
    shippingSameAsBilling: true
  };

  handleSubmit = event => {
    event.preventDefault();
    // const values = this.state; // ???
    // const values = serializeForm(event.target, { hash: true });
    const data = new FormData(event.target);
    const values = data.getAll();
    console.log(values);
  };

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>
                Billing Name:{" "}
                <input
                  type="text"
                  name="billingName"
                  defaultValue={this.state.billingName}
                  onChange={event =>
                    this.setState({ billingName: event.target.value })
                  }
                />
              </label>
            </p>
            <p>
              <label>
                Billing State:{" "}
                <input
                  type="text"
                  size="2"
                  name="billingState"
                  defaultValue={this.state.billingState}
                  onChange={event =>
                    this.setState({ billingState: event.target.value })
                  }
                />
              </label>
            </p>
          </fieldset>

          <br />

          <fieldset>
            <label>
              <input
                type="checkbox"
                defaultChecked={this.state.shippingSameAsBilling}
                onChange={event => {
                  this.setState({
                    shippingSameAsBilling: event.target.checked
                  });
                }}
              />{" "}
              Same as billing
            </label>
            <legend>Shipping Address</legend>
            <p>
              <label>
                Shipping Name:{" "}
                <input
                  type="text"
                  name="shippingName"
                  value={
                    this.state.shippingSameAsBilling
                      ? this.state.billingName
                      : this.state.shippingName
                  }
                  onChange={event =>
                    this.setState({ shippingName: event.target.value })
                  }
                  readOnly={this.state.shippingSameAsBilling}
                />
              </label>
            </p>
            <p>
              <label>
                Shipping State:{" "}
                <input
                  type="text"
                  size="2"
                  name="shippingState"
                  value={
                    this.state.shippingSameAsBilling
                      ? this.state.billingState
                      : this.state.shippingState
                  }
                  onChange={event =>
                    this.setState({ shippingState: event.target.value })
                  }
                  readOnly={this.state.shippingSameAsBilling}
                />
              </label>
            </p>
          </fieldset>

          <p>
            <button>Submit</button>
          </p>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<CheckoutForm />, document.getElementById("app"));
