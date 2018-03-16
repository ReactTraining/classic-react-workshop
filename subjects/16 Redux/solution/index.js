/*
The goal of this exercise is to gain some hands-on experience using Redux to
manage the state of a React application. In the process, we'll also learn how to
use Redux to communicate changes to a real API server.

  - Get the <ContactList> the props it needs by using connect() to connect it to
    the <Provider> in its parent, the <App>.
  - Once it's connected, if you open the console you'll see the contacts being
    loaded from the API.
  - Add a delete <button> next to each contact that dispatches a DELETE_CONTACT
    action. Check the console to make sure the action is being dispatched.
  - Add some logic to the contacts reducer to remove that contact when it sees
    the DELETE_CONTACT action come through. Also, send a request to the API server
    to actually delete the contact on the server. When you refresh the page, that
    contact should not appear.
  - To start with a fresh list of contacts, use `localStorage.clear()` in the
    browser's console.

We've added the logger middleware to show you all changes as they are happening
in the browser console. If you get stuck, be sure to check the logs!

Got extra time?

  - Use the throttling feature in Chrome's Network tab to simulate a really slow
    connection. How does the UI respond to your actions? What can you do to improve
    the UX?
*/
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("app"));
