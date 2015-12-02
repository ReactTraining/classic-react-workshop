import { getJSON, deleteJSON } from '../lib/xhr'
import { contactsWereLoaded, contactWasDeleted, errorDeletingContact } from '../actions/ServerActionCreators'

const API = 'http://addressbook-api.herokuapp.com'

export function loadContacts() {
  getJSON(`${API}/contacts`, function (error, res) {
    contactsWereLoaded(res.contacts)
  })
}

export function deleteContact(contact) {
  deleteJSON(`${API}/contacts/${contact.id}`, function (error, res) {
    fakeNetworkLatency(function () {
      if (error) {
        errorDeletingContact(error, contact)
      } else {
        contactWasDeleted(contact)
      }
    })
  })
}

function fakeNetworkLatency(callback) {
  setTimeout(callback, Math.random() * 5000)
}
