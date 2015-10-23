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
      type: ActionTypes.CONTACT_WAS_DELETED,
      contact: contact
    });
  },

  errorDeletingContact: function (error, contact) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ERROR_DELETING_CONTACT,
      error: error,
      contact: contact
    });
  }
};

module.exports = ServerActionCreators;
