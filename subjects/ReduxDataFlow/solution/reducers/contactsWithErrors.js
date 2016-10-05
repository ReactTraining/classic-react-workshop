import { ADD_CONTACT, CONTACTS_WERE_LOADED, ERROR_DELETING_CONTACT } from '../actions/contacts'

export default function (state = {}, action) {
  if (action.type === ERROR_DELETING_CONTACT)
    return {
      ...state,
      [action.contactId]: action.message
    }
  else
    return state
}
