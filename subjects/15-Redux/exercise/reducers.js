import { ADD_CONTACT, CONTACTS_WERE_LOADED } from "./actions";

export function contacts(state = [], action) {
  if (action.type === ADD_CONTACT) {
    return state.concat([action.contact]);
  } else if (action.type === CONTACTS_WERE_LOADED) {
    return action.contacts;
  } else {
    return state;
  }
}
