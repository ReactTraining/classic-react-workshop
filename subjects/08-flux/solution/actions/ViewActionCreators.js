var ActionTypes = require('../Constants').ActionTypes;
var AppDispatcher = require('../AppDispatcher');
var APIUtils = require('../utils/APIUtils');

var ViewActionCreators = {
  loadContacts: function () {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_CONTACTS
    });
    APIUtils.loadContacts();
  },

  deleteContact: function (contact) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CONTACT_DELETED,
      contact: contact
    });
    APIUtils.deleteContact(contact);
  }
};

module.exports = ViewActionCreators;
