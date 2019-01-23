import { fetchContacts, deleteContactById } from "./utils/api";

export const ADD_CONTACT = "ADD_CONTACT";
export const LOAD_CONTACTS = "LOAD_CONTACTS";
export const CONTACTS_WERE_LOADED = "CONTACTS_WERE_LOADED";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const CONTACT_WAS_DELETED = "CONTACT_WAS_DELETED";
export const CONTACT_ERROR = "CONTACT_ERROR";

export function addContact(contact) {
  return {
    type: ADD_CONTACT,
    contact
  };
}

export function loadContacts(dispatch) {
  dispatch({ type: LOAD_CONTACTS });

  fetchContacts((error, contacts) => {
    dispatch({
      type: CONTACTS_WERE_LOADED,
      contacts
    });
  });
}

export function deleteContact(dispatch, contact) {
  dispatch({ type: DELETE_CONTACT, contact });

  deleteContactById(contact.id, error => {
    if (error) {
      dispatch({
        type: CONTACT_ERROR,
        error,
        contact
      });
    } else {
      dispatch({
        type: CONTACT_WAS_DELETED,
        contact
      });
    }
  });
}
