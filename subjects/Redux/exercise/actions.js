import { fetchContacts, deleteContactById } from './utils/api'

export const ADD_CONTACT = 'ADD_CONTACT'
export const LOAD_CONTACTS = 'LOAD_CONTACTS'
export const CONTACTS_WERE_LOADED = 'CONTACTS_WERE_LOADED'

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
