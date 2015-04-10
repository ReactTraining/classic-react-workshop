var ActionTypes = require('../Constants').ActionTypes;
var AppDispatcher = require('../AppDispatcher');

var ServerActionCreators = {
  loadedContacts: function (contacts) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.CONTACTS_LOADED,
      contacts: contacts
    });
  },

  deletedContact: function (contact) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.CONTACT_DELETED,
      contact: contact
    });
  }
};

module.exports = ServerActionCreators;
