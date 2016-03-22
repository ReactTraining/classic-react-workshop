import { fetchContacts, deleteContactById } from '../lib/contactsAPI'

export const ADD_CONTACT = 'ADD_CONTACT'
export const LOAD_CONTACTS = 'LOAD_CONTACTS'
export const CONTACTS_WERE_LOADED = 'CONTACTS_WERE_LOADED'

export function loadContacts(dispatch) {
  dispatch({ type: LOAD_CONTACTS })
  fetchContacts((error, contacts) => {
    dispatch({
      type: CONTACTS_WERE_LOADED,
      contacts
    })
  })
}

export function addContact(contact) {
  return {
    type: ADD_CONTACT,
    contact
  }
}
