import React from "react";
import { connect } from "react-redux";
import { addContact, loadContacts } from "../actions";
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

  render() {
    const { contacts } = this.props;

    return (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {contacts.map(contact => (
          <li key={contact.id}>
            <img src={contact.avatar} height="50" /> {contact.first}{" "}
            {contact.last}
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

export default ContactList;
