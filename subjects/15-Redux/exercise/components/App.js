import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import ContactList from "./ContactList";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <h1>Contacts!</h1>
          <ContactList />
        </div>
      </Provider>
    );
  }
}

export default App;
