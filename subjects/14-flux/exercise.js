import React from 'react'
import { render } from 'react-dom'
import ContactList from './exercise/components/ContactList'

/*
The goal of this exercise is to add a button beside each contact in the list
that can be used to delete that contact. To do this, you'll need to perform
the following steps:

* Hint: Open up Flux.png and make your way around the Flux diagram as you go *

- Make the <ContactList> component listen for changes to the ContactStore and
  updates its state when the store changes
- Add a "delete" button next to each contact (components/ContactList.js)
- The delete button should create an action (actions/ViewActionCreators.js) that does two things:
  - Sends a "delete contact" action through the dispatcher
  - Sends a request to the server to actually delete the contact
- The server creates an action that sends a "contact was deleted" action through the dispatcher
- The ContactStore (stores/ContactStore.js) picks up the "delete contact" event, removes
  the corresponding contact, and fires a change event
*/

render(<ContactList/>, document.getElementById('app'))
