/* eslint no-console: 0 */
import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import { ActionTypes } from '../Constants'

const CHANGE_EVENT = 'CHANGE'
const events = new EventEmitter

const state = {
  contacts: [],
  loaded: false
}

function setState(newState) {
  Object.assign(state, newState)
  events.emit(CHANGE_EVENT)
  console.log('ContactStore state changed', state)
}

export function addChangeListener(fn) {
  events.addListener(CHANGE_EVENT, fn)
}

export function removeChangeListener(fn) {
  events.removeListener(CHANGE_EVENT, fn)
}

export function getState() {
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
})
