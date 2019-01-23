import {
  ADD_CONTACT,
  CONTACTS_WERE_LOADED,
  DELETE_CONTACT,
  CONTACT_WAS_DELETED,
  CONTACT_ERROR
} from "./actions";

export function contacts(state = [], action) {
  if (action.type === ADD_CONTACT) {
    return state.concat([action.contact]);
  } else if (action.type === CONTACTS_WERE_LOADED) {
    return action.contacts;
  } else if (action.type === CONTACT_WAS_DELETED) {
    return state.filter(c => c.id !== action.contact.id);
  } else {
    return state;
  }
}

export function contactsPendingDeletion(state = [], action) {
  if (action.type === DELETE_CONTACT) {
    return state.concat([action.contact]);
  } else if (action.type === CONTACT_WAS_DELETED) {
    return state.filter(c => c.id !== action.contact.id);
  }

  return state;
}

export function contactErrors(state = {}, action) {
  if (action.type === CONTACT_ERROR) {
    return {
      ...state,
      [action.contact.id]: action.error
    };
  }

  return state;
}
