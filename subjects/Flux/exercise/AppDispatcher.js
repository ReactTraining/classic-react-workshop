/* eslint no-console: 0 */
import { Dispatcher } from 'flux'
import { PayloadSources } from './Constants'

const AppDispatcher = new Dispatcher

export function dispatchViewAction(action) {
  console.log('dispatching view action', action)
  AppDispatcher.dispatch({
    source: PayloadSources.VIEW_ACTION,
    action: action
  })
}

export function dispatchServerAction(action) {
  console.log('dispatching server action', action)
  AppDispatcher.dispatch({
    source: PayloadSources.SERVER_ACTION,
    action: action
  })
}

export default AppDispatcher
