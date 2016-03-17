import { fetchContacts, deleteContactById } from '../lib/contactsAPI'

export const ADD_CONTACT = 'ADD_CONTACT'
export const LOAD_CONTACTS = 'LOAD_CONTACTS'
export const CONTACTS_WERE_LOADED = 'CONTACTS_WERE_LOADED'
export const DELETE_CONTACT = 'DELETE_CONTACT'
export const CONTACT_WAS_DELETED = 'CONTACT_WAS_DELETED'
export const ERROR_DELETING_CONTACT = 'ERROR_DELETING_CONTACT'

export function deleteContact(contactId) {
  return (dispatch) => {
    dispatch({ type: DELETE_CONTACT, contactId })
    deleteContactById(contactId, (error) => {
      if (error) {
        dispatch({
          type: ERROR_DELETING_CONTACT,
          message: error.message,
          contactId
        })
      } else {
        dispatch({ type: CONTACT_WAS_DELETED, contactId })
      }
    })
  }
}

export function loadContacts() {
  return (dispatch) => {
    dispatch({ type: LOAD_CONTACTS })
    fetchContacts((error, contacts) => {
      dispatch({
        type: CONTACTS_WERE_LOADED,
        contacts
      })
    })
  }
}

export function addContact(contact) {
  return {
    type: ADD_CONTACT,
    contact
  }
}
