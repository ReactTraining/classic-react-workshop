import React from "react";
import fetchContacts from "./fetchContacts";

class App extends React.Component {
  // TODO: Move this state to a prop. That will make it
  // possible to render on the server.
  state = {
    contacts: []
  };

  componentDidMount() {
    // TODO: Move this call into the request handler on the server.
    fetchContacts((error, contacts) => {
      this.setState({ contacts });
    });
  }

  render() {
    const { contacts } = this.state;

    return (
      <div>
        <h1>¡Universal App!</h1>
        {contacts ? (
          <ul>
            {contacts.map(contact => (
              <li key={contact.id}>
                {contact.first} {contact.last}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default App;
