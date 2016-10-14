import { getJSON, deleteJSON } from './xhr'

const ServerURL = 'http://addressbook-api.herokuapp.com'

export const fetchContacts = (cb) => {
  getJSON(`${ServerURL}/contacts`, (error, res) => {
    cb(error, res.contacts)
  })
}

export const deleteContactById = (contactId, cb) => {
  deleteJSON(`${ServerURL}/contacts/${contactId}`, cb)
}
