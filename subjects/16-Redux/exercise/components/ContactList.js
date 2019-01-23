import React from "react";
import { connect } from "react-redux";
import { addContact, loadContacts, deleteContact } from "../actions";
import CreateContactForm from "./CreateContactForm";

class ContactList extends React.Component {
  static defaultProps = {
    contacts: [],
    dispatch: () => {
      console.log(
        "Dispatch failed; you still need to connect() your ContactList"
      );
    }
  };

  componentDidMount() {
    loadContacts(this.props.dispatch);
  }

  createContact(contact) {
    this.props.dispatch(addContact(contact));
  }

  deleteContact(contact) {
    deleteContact(this.props.dispatch, contact);
  }

  render() {
    const {
      contacts,
      contactsPendingDeletion,
      contactErrors
    } = this.props;

    return (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {contacts.map(contact => (
          <li
            key={contact.id}
            style={{
              opacity: contactsPendingDeletion.includes(contact)
                ? 0.5
                : 1
            }}
          >
            <img src={contact.avatar} height="50" /> {contact.first}{" "}
            {contact.last}{" "}
            {contactErrors[contact.id] ? (
              <p style={{ color: "red" }}>
                {contactErrors[contact.id].message}
              </p>
            ) : (
              <button
                onClick={() => this.deleteContact(contact)}
                disabled={contactsPendingDeletion.includes(contact)}
              >
                delete
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

function mapStateToProps(state) {
  return {
    contacts: state.contacts,
    contactsPendingDeletion: state.contactsPendingDeletion,
    contactErrors: state.contactErrors
  };
}

export default connect(mapStateToProps)(ContactList);
