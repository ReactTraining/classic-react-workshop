import { fetchContacts, deleteContactById } from './utils/api'

export const ADD_CONTACT = 'ADD_CONTACT'
export const LOAD_CONTACTS = 'LOAD_CONTACTS'
export const CONTACTS_WERE_LOADED = 'CONTACTS_WERE_LOADED'
export const DELETE_CONTACT = 'DELETE_CONTACT'
export const CONTACT_WAS_DELETED = 'CONTACT_WAS_DELETED'
export const ERROR_DELETING_CONTACT = 'ERROR_DELETING_CONTACT'

export const addContact = (contact) => {
  return {
    type: ADD_CONTACT,
    contact
  }
}

export const loadContacts = (dispatch) => {
  dispatch({ type: LOAD_CONTACTS })

  fetchContacts((error, contacts) => {
    dispatch({
      type: CONTACTS_WERE_LOADED,
      contacts
    })
  })
}

export const deleteContact = (dispatch, contactId) => {
  // We can handle latency with two actions: one when we begin...
  dispatch({ type: DELETE_CONTACT, contactId })

  deleteContactById(contactId, (error) => {
    if (error) {
      // We can handle network errors with another action!
      dispatch({
        type: ERROR_DELETING_CONTACT,
        message: error.message,
        contactId
      })
    } else {
      // ...and another when we finish!
      dispatch({ type: CONTACT_WAS_DELETED, contactId })
    }
  })
}
