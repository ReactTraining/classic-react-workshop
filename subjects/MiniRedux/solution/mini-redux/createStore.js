import { EventEmitter } from 'events'

const CHANGE = 'change'

export default function createStore(reducer) {
  let state = reducer(undefined, { type: '@INIT' })
  const events = new EventEmitter()

  return {
    getState() {
      return state
    },

    dispatch(action) {
      state = reducer(state, action)
      events.emit(CHANGE)
    },

    listen(listener) {
      events.on(CHANGE, listener)
    },

    removeListener(listener) {
      event.removeListener(CHANGE, listener)
    }
  }
}
