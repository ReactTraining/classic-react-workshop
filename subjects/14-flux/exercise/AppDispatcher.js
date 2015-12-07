import { Dispatcher } from 'flux'
import { PayloadSources } from './Constants'

const AppDispatcher = new Dispatcher
  
export function dispatchViewAction(action) {
  AppDispatcher.dispatch({
    source: PayloadSources.VIEW_ACTION,
    action: action
  })
}

export function dispatchServerAction(action) {
  AppDispatcher.dispatch({
    source: PayloadSources.SERVER_ACTION,
    action: action
  })
}

export default AppDispatcher
