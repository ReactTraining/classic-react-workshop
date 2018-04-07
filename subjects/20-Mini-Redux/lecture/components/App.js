import React from "react";
import PropTypes from "prop-types";
import CreateContactForm from "./CreateContactForm";

class App extends React.Component {
  state = {
    contacts: [
      {
        id: "mj",
        first: "Michael",
        last: "Jackson",
        avatar:
          "https://pbs.twimg.com/profile_images/902276500107362304/vju-WV1i_400x400.jpg"
      },
      {
        id: "blee",
        first: "Bruce",
        last: "Lee",
        avatar:
          "https://pbs.twimg.com/profile_images/534863086276988928/bX3juDCC_400x400.jpeg"
      }
    ]
  };

  handleCreateContact = contact => {
    this.setState({
      contacts: this.state.contacts.concat([contact])
    });
  };

  render() {
    return (
      <div>
        <h1>Contacts!</h1>

        <ul style={{ listStyleType: "none", padding: 0 }}>
          {this.state.contacts.map(contact => (
            <li key={contact.id}>
              <img src={contact.avatar} height="50" /> {contact.first}{" "}
              {contact.last}
            </li>
          ))}
          <li>
            <CreateContactForm onCreate={this.handleCreateContact} />
          </li>
        </ul>
      </div>
    );
  }
}

export default App;
