var xhr = require('../lib/xhr');
var { API, ActionTypes } = require('../Constants');
var ServerActionCreators = require('../actions/ServerActionCreators');

var APIUtils = {
  loadContacts: function () {
    xhr.getJSON(`${API}/contacts`, function (err, res) {
      ServerActionCreators.loadedContacts(res.contacts);
    });
  },

  deleteContact: function (contact) {
    xhr.deleteJSON(`${API}/contacts/${contact.id}`, function (err, res) {
      ServerActionCreators.deletedContact(contact);
    });
  }
};

module.exports = APIUtils;
