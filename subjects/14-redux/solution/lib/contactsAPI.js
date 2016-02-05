import { getJSON, deleteJSON } from './xhr'

const API = 'http://addressbook-api.herokuapp.com'

export function fetchContacts(cb) {
  getJSON(`${API}/contacts`, (error, res) => {
    cb(error, res.contacts)
  })
}

export function deleteContactById(contactId, cb) {
  deleteJSON(`${API}/contacts/${contactId}`, cb)
}

