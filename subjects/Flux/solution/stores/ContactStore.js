import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import { ActionTypes } from '../Constants'

const CHANGE_EVENT = 'CHANGE'
const events = new EventEmitter

const state = {
  contacts: [],
  deletingContacts: [],
  errors: {},
  loaded: false
}

function setState(newState) {
  Object.assign(state, newState)
  events.emit(CHANGE_EVENT)
  console.log('ContactStore state changed', state)
}

function addChangeListener(fn) {
  events.addListener(CHANGE_EVENT, fn)
}

function removeChangeListener(fn) {
  events.removeListener(CHANGE_EVENT, fn)
}

function getState() {
  return state
}

AppDispatcher.register(function (payload) {
  const { action } = payload

  if (action.type === ActionTypes.CONTACTS_WERE_LOADED) {
    setState({
      loaded: true,
      contacts: action.contacts
    })
  }

  if (action.type === ActionTypes.DELETE_CONTACT) {
    setState({
      deletingContacts: state.deletingContacts.concat([ action.contact ])
    })
  }

  if (action.type === ActionTypes.ERROR_DELETING_CONTACT) {
    const { errors } = state
    errors[action.contact.id] = action.error

    setState({
      deletingContacts: state.deletingContacts.filter(c => c.id !== action.contact.id),
      errors
    })
  }

  if (action.type === ActionTypes.CONTACT_WAS_DELETED) {
    setState({
      contacts: state.contacts.filter(c => c.id !== action.contact.id),
      deletingContacts: state.deletingContacts.filter(c => c.id !== action.contact.id)
    })
  }
})

export default { getState, removeChangeListener, addChangeListener }

