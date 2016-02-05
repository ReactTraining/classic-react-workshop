import { DELETE_CONTACT, ERROR_DELETING_CONTACT } from '../actions/contacts'

export default function (state={}, action) {
  if (action.type === DELETE_CONTACT)
    return {
      ...state,
      [action.contactId]: true
    }
  else if (action.type === ERROR_DELETING_CONTACT) {
    delete state[action.contactId]
    return { ...state }
  } else
    return state
}

