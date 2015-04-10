var React = require('react');
var App = require('./exercise/components/App');

/*
The goal of this exercise is to add a button beside each contact in the list
that can be used to delete that contact. To do this, you'll need to perform
the following steps:

* Hint: Open up Flux.png and make your way around the Flux diagram as you go *

- Make the <App> component listen for changes to the ContactStore and updates its
  state when the store changes
- Add a "delete" button next to each contact (components/App.js)
- The delete button should create an action (actions/ViewActionCreators.js) that deletes a contact
- The action creator does two things:
  - Sends a "contact deleted" event through the dispatcher
  - Sends a request to the server to actually delete the contact
- The ContactStore (stores/ContactStore.js) picks up the "contact deleted" event, removes
  the corresponding contact, and fires a change event
*/

React.render(<App/>, document.getElementById('app'));
