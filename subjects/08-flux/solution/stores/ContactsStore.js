var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../AppDispatcher');
var ActionTypes = require('../Constants').ActionTypes;

var events = new EventEmitter();
var CHANGE_EVENT = 'CHANGE';

var state = {
  contacts: [],
  contactsPendingDelete: [],
  contactErrors: {}, // keyed by contact.id
  loaded: false
};

function setState(newState) {
  assign(state, newState);
  events.emit(CHANGE_EVENT);
}

var ContactsStore = {
  addChangeListener: function (fn) {
    events.addListener(CHANGE_EVENT, fn);
  },

  removeChangeListener: function (fn) {
    events.removeListener(CHANGE_EVENT, fn);
  },

  getState: function () {
    return state;
  }
};

ContactsStore.dispatchToken = AppDispatcher.register(function (payload) {
  var { action } = payload;

  if (action.type === ActionTypes.DELETE_CONTACT) {
    setState({
      contactsPendingDelete: state.contactsPendingDelete.concat([ action.contact ])
    });
  }

  if (action.type === ActionTypes.CONTACT_WAS_DELETED) {
    setState({
      contacts: state.contacts.filter(c => c.id !== action.contact.id),
      contactsPendingDelete: state.contactsPendingDelete.filter(c => c.id !== action.contact.id)
    });
  }

  if (action.type === ActionTypes.ERROR_DELETING_CONTACT) {
    var contactErrors = state.contactErrors;
    contactErrors[action.contact.id] = action.error;
    setState({
      contactErrors: contactErrors,
      contactsPendingDelete: state.contactsPendingDelete.filter(c => c.id !== action.contact.id)
    });
  }

  if (action.type === ActionTypes.CONTACTS_LOADED) {
    setState({
      loaded: true,
      contacts: action.contacts
    });
  }
});

module.exports = ContactsStore;
