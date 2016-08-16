import { ADD_CONTACT, CONTACTS_WERE_LOADED, CONTACT_WAS_DELETED } from '../actions/contacts'

export default function (state = [], action) {
  if (action.type === ADD_CONTACT)
    return state.concat([ action.contact ])
  else if (action.type === CONTACTS_WERE_LOADED)
    return action.contacts
  else if (action.type === CONTACT_WAS_DELETED)
    return state.filter(contact => contact.id !== action.contactId)
  else
    return state
}
