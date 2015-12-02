import { getJSON, deleteJSON } from '../lib/xhr'
import { contactsWereLoaded, contactWasDeleted } from '../actions/ServerActionCreators'

const API = 'http://addressbook-api.herokuapp.com'

export function loadContacts() {
  getJSON(`${API}/contacts`, function (error, res) {
    contactsWereLoaded(res.contacts)
  })
}

export function deleteContact(contact) {
  deleteJSON(`${API}/contacts/${contact.id}`, function (error, res) {
    contactWasDeleted(contact)
  })
}
