import React from "react";
import PropTypes from "prop-types";

class App extends React.Component {
  static propTypes = {
    contacts: PropTypes.array
  };

  render() {
    const { contacts } = this.props;

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
