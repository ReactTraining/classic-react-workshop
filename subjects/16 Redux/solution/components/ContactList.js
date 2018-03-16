import React from "react";
import { connect } from "react-redux";
import { addContact, loadContacts, deleteContact } from "../actions";
import CreateContactForm from "./CreateContactForm";

class ContactList extends React.Component {
  static defaultProps = {
    contacts: []
  };

  componentDidMount() {
    loadContacts(this.props.dispatch);
  }

  createContact(contact) {
    this.props.dispatch(addContact(contact));
  }

  deleteContact(contact) {
    deleteContact(contact.id, this.props.dispatch);
  }

  render() {
    const {
      contacts,
      contactsWithErrors,
      contactsBeingDeleted
    } = this.props;

    return (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {contacts.map(contact => (
          <li
            key={contact.id}
            style={{
              background: contactsWithErrors[contact.id] ? "red" : "",
              opacity: contactsBeingDeleted[contact.id] ? "0.25" : ""
            }}
          >
            <img
              src={contact.avatar}
              height={contactsWithErrors[contact.id] ? "200" : "50"}
            />{" "}
            {contact.first} {contact.last}{" "}
            {contactsWithErrors[contact.id] ? (
              <p>{contactsWithErrors[contact.id]}</p>
            ) : (
              <button onClick={() => this.deleteContact(contact)}>
                Delete
              </button>
            )}
          </li>
        ))}
        <li>
          <CreateContactForm
            onCreate={contact => this.createContact(contact)}
          />
        </li>
      </ul>
    );
  }
}

export default connect(state => state)(ContactList);
