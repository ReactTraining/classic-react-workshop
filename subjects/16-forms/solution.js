////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - Add a "shipping address" fieldset with the same fields as billing
// - Add a checkbox labeled "same as billing address" above the fields
// - When the checkbox is checked, automatically fill in the shipping fields
//   and disable them
// - When the fields in the billing address change, make sure the shipping
//   address fields stay up to date. You might want to use `formSerialize` here,
//   also check out the docs, particularly nested objects because it might help
//   you think about your state better
//   https://www.npmjs.com/package/form-serialize#nested-objects
//
// Got extra time?
//
// - If the user types something into shipping, then clicked the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox a second time
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
import React from 'react'
import { render } from 'react-dom'
import serializeForm from 'form-serialize'

const CheckoutForm = React.createClass({
  getInitialState() {
    return {
      billing: {},
      shippingSameAsBilling: false,
      shipping: {}
    }
  },

  handleChange() {
    const formNode = this.refs.form
    const nextState = serializeForm(formNode, { hash: true })

    nextState.shippingSameAsBilling = (nextState.shippingSameAsBilling === 'on')

    if (nextState.shippingSameAsBilling)
      nextState.shipping = nextState.billing || {}

    // If the checkbox changed, back up shipping so we can preserve it.
    if (nextState.shippingSameAsBilling !== this.state.shippingSameAsBilling) {
      if (nextState.shippingSameAsBilling) {
        this.shippingBackup = this.state.shipping
      } else {
        nextState.shipping = this.shippingBackup
      }
    }

    this.setState(nextState)
  },

  render() {
    const { billing, shippingSameAsBilling, shipping } = this.state

    return (
      <div>
        <h1>Checkout</h1>
        <form ref="form" onChange={this.handleChange}>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>Name: <input
                  name="billing[name]"
                  type="text"
                  defaultValue={billing.name}
                /></label>
            </p>
            <p>
              <label>Address Line 1: <input
                  name="billing[addr1]"
                  type="text"
                  defaultValue={billing.addr1}
                /></label>
            </p>
            <p>
              <label>Address Line 2: <input
                  name="billing[addr2]"
                  type="text"
                  defaultValue={billing.addr2}
                /></label>
            </p>
            <p>
              <label>City: <input
                  name="billing[city]"
                  type="text"
                  defaultValue={billing.city}
                /></label> {' '}
              <label>State: <input
                  name="billing[state]"
                  type="text"
                  size="3"
                  defaultValue={billing.state}
                /></label> {' '}
              <label>Zip: <input
                  name="billing[zip]"
                  type="text"
                  size="8"
                  defaultValue={billing.zip}
                /></label>
            </p>
          </fieldset>
          <fieldset>
            <legend>Shipping Address</legend>
            <p>
              <label>
                <input
                  type="checkbox"
                  name="shippingSameAsBilling"
                  defaultChecked={shippingSameAsBilling}
                /> Same as billing address
              </label>
            </p>
            <p>
              <label>Name: <input
                  name="shipping[name]"
                  type="text"
                  value={shipping.name}
                  readOnly={shippingSameAsBilling}
                /></label>
            </p>
            <p>
              <label>Address Line 1: <input
                  name="shipping[addr1]"
                  type="text"
                  value={shipping.addr1}
                  readOnly={shippingSameAsBilling}
                /></label>
            </p>
            <p>
              <label>Address Line 2: <input
                  name="shipping[addr2]"
                  type="text"
                  value={shipping.addr2}
                  readOnly={shippingSameAsBilling}
                /></label>
            </p>
            <p>
              <label>City: <input
                  name="shipping[city]"
                  type="text"
                  value={shipping.city}
                  readOnly={shippingSameAsBilling}
                /></label> {' '}
              <label>State: <input
                  name="shipping[state]"
                  type="text"
                  size="3"
                  value={shipping.state}
                  readOnly={shippingSameAsBilling}
                /></label> {' '}
              <label>Zip: <input
                  name="shipping[zip]"
                  type="text"
                  size="8"
                  value={shipping.zip}
                  readOnly={shippingSameAsBilling}
                /></label>
            </p>
          </fieldset>
        </form>
      </div>
    )
  }
})

render(<CheckoutForm/>, document.getElementById('app'))
