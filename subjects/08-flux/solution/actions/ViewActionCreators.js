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
      type: ActionTypes.DELETE_CONTACT,
      contact: contact
    });
    APIUtils.deleteContact(contact);
  }
};

module.exports = ViewActionCreators;
