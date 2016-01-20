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
//   you think about your state better https://www.npmjs.com/package/form-serialize#nested-objects
// - When the form is submitted, console.log its values
//
// Got extra time?
//
// - If the user types something into shipping, then clicked the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox a second time
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If you didn't already, abstract some of your render method into components

import React from 'react'
import { render, findDOMNode } from 'react-dom'
import serializeForm from 'form-serialize'

const CheckoutForm = React.createClass({
  getInitialState() {
    return {
      billingAddr: {
        name: 'Ryan Florence',
        addr1: '123 Easy Street',
        addr2: '',
        city: 'Puyallup',
        state: 'WA',
        zip: '98374'
      },
      shippingSameAsBilling: true
    }
  },

  handleFormChange() {
    const form = findDOMNode(this.refs.form)
    const data = serializeForm(form, { hash: true })
    this.setState({
      billingAddr: data.billingAddr
    })
  },

  render() {
    const { name, addr1, addr2, city, state, zip } = this.state.billingAddr
    const { shippingSameAsBilling } = this.state

    return (
      <div>
        <h1>Checkout</h1>
        <form ref="form" onChange={this.handleFormChange}>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>Name: <input type="text" defaultValue={name} name="billingAddr[name]"/></label>
            </p>
            <p>
              <label>Address Line 1: <input type="text" defaultValue={addr1} name="billingAddr[addr1]"/></label>
            </p>
            <p>
              <label>Address Line 2: <input type="text" defaultValue={addr2} name="billingAddr[addr2]"/></label>
            </p>
            <p>
              <label>City: <input type="text" defaultValue={city} name="billingAddr[city]"/></label> {' '}
              <label>State: <input type="text" size="3" defaultValue={state} name="billingAddr[state]"/></label> {' '}
              <label>Zip: <input type="text" size="8" defaultValue={zip} name="billingAddr[zip]"/></label>
            </p>
          </fieldset>

          <fieldset>
            <legend>Shipping Address</legend>
            <p>
              <label><input
                  type="checkbox"
                  checked={shippingSameAsBilling}
                  onChange={(event) => this.setState({ shippingSameAsBilling: event.target.checked })}
                /> Same as billing</label>
            </p>
            <p>
              <label>Name: <input type="text"
                  value={shippingSameAsBilling ? name : null}
                  readOnly={shippingSameAsBilling}
                  disabled={shippingSameAsBilling}
                /></label>
            </p>

            <p>
              <label>Address Line 1: <input type="text"
                  value={shippingSameAsBilling ? addr1 : null}
                  readOnly={shippingSameAsBilling}
                  disabled={shippingSameAsBilling}
                /></label>
            </p>

            <p>
              <label>Address Line 2: <input type="text"
                  value={shippingSameAsBilling ? addr2 : null}
                  readOnly={shippingSameAsBilling}
                  disabled={shippingSameAsBilling}
                /></label>
            </p>

            <p>
              <label>City: <input type="text"
                  value={shippingSameAsBilling ? city : null}
                  readOnly={shippingSameAsBilling}
                  disabled={shippingSameAsBilling}
              /></label> {' '}
              <label>State: <input type="text" size="2"
                  value={shippingSameAsBilling ? city : null}
                  readOnly={shippingSameAsBilling}
                  disabled={shippingSameAsBilling}
              /></label> {' '}
              <label>Zip: <input type="text" size="8"
                  value={shippingSameAsBilling ? city : null}
                  readOnly={shippingSameAsBilling}
                  disabled={shippingSameAsBilling}
                /></label>
            </p>
          </fieldset>
        </form>
      </div>
    )
  }
})

render(<CheckoutForm/>, document.getElementById('app'))
