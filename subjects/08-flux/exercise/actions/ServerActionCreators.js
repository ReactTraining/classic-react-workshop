import { ActionTypes } from '../Constants'
import { dispatchServerAction } from '../AppDispatcher'

export function loadedContacts(contacts) {
  dispatchServerAction({
    type: ActionTypes.CONTACTS_LOADED,
    contacts: contacts
  })
}
