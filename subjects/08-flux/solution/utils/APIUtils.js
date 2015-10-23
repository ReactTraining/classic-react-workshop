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
      // Fake server latency ... BWHAHAHAHAHAHAH!
      setTimeout(function () {
        if (err) {
          ServerActionCreators.errorDeletingContact(err, contact);
        } else {
          ServerActionCreators.deletedContact(contact);
        }
      }, 5000);
    });
  }
};

module.exports = APIUtils;
