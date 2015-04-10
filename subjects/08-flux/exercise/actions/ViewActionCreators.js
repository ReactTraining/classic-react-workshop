var ActionTypes = require('../Constants').ActionTypes;
var AppDispatcher = require('../AppDispatcher');
var APIUtils = require('../utils/APIUtils');

var ViewActionCreators = {
  loadContacts: function () {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_CONTACTS
    });
    APIUtils.loadContacts();
  }
};

module.exports = ViewActionCreators;
