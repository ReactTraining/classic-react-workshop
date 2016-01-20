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
import { render } from 'react-dom'
import serializeForm from 'form-serialize'

const CheckoutForm = React.createClass({
  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>Name: <input type="text" defaultValue="Ryan Florence"/></label>
            </p>
            <p>
              <label>Address Line 1: <input type="text"/></label>
            </p>
            <p>
              <label>Address Line 2: <input type="text"/></label>
            </p>
            <p>
              <label>City: <input type="text"/></label> {' '}
              <label>State: <input type="text" size="3"/></label> {' '}
              <label>Zip: <input type="text" size="8"/></label>
            </p>
          </fieldset>
        </form>
      </div>
    )
  }
})

render(<CheckoutForm/>, document.getElementById('app'))
