import { ActionTypes } from '../Constants'
import { dispatchViewAction } from '../AppDispatcher'
import * as APIUtils from '../utils/APIUtils'

export function loadContacts() {
  dispatchViewAction({
    type: ActionTypes.LOAD_CONTACTS
  })

  APIUtils.loadContacts()
}

export function deleteContact(contact) {
  dispatchViewAction({
    type: ActionTypes.DELETE_CONTACT,
    contact
  })

  APIUtils.deleteContact(contact)
}
