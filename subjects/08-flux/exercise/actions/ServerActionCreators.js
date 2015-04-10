var ActionTypes = require('../Constants').ActionTypes;
var AppDispatcher = require('../AppDispatcher');

var ServerActionCreators = {
  loadedContacts: function (contacts) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.CONTACTS_LOADED,
      contacts: contacts
    });
  }
};

module.exports = ServerActionCreators;
