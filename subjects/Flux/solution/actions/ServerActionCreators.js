import { ActionTypes } from '../Constants'
import { dispatchServerAction } from '../AppDispatcher'

export function contactsWereLoaded(contacts) {
  dispatchServerAction({
    type: ActionTypes.CONTACTS_WERE_LOADED,
    contacts
  })
}

export function contactWasDeleted(contact) {
  dispatchServerAction({
    type: ActionTypes.CONTACT_WAS_DELETED,
    contact
  })
}

export function errorDeletingContact(error, contact) {
  dispatchServerAction({
    type: ActionTypes.ERROR_DELETING_CONTACT,
    error,
    contact
  })
}
