import {
  ADD_CONTACT,
  CONTACTS_WERE_LOADED,
  DELETE_CONTACT,
  CONTACT_WAS_DELETED,
  ERROR_DELETING_CONTACT
} from "./actions";

export function contacts(state = [], action) {
  if (action.type === ADD_CONTACT) {
    return state.concat([action.contact]);
  } else if (action.type === CONTACTS_WERE_LOADED) {
    return action.contacts;
  } else if (action.type === CONTACT_WAS_DELETED) {
    return state.filter(contact => contact.id !== action.contactId);
  } else {
    return state;
  }
}

export function contactsBeingDeleted(state = {}, action) {
  if (action.type === DELETE_CONTACT) {
    return {
      ...state,
      [action.contactId]: true
    };
  } else if (action.type === ERROR_DELETING_CONTACT) {
    delete state[action.contactId];
    return { ...state };
  } else {
    return state;
  }
}

export function contactsWithErrors(state = {}, action) {
  if (action.type === ERROR_DELETING_CONTACT) {
    return {
      ...state,
      [action.contactId]: action.message
    };
  } else {
    return state;
  }
}
