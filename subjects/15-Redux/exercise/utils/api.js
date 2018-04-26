import { getJSON, deleteJSON } from "./xhr";

const serverURL = "http://addressbook-api.herokuapp.com";

export function fetchContacts(cb) {
  getJSON(`${serverURL}/contacts`, (error, res) => {
    cb(error, res.contacts);
  });
}

export function deleteContactById(contactId, cb) {
  deleteJSON(`${serverURL}/contacts/${contactId}`, cb);
}
