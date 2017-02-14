import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import * as reducers from './reducers'
import logger from './logger'

const reducer = combineReducers(reducers)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default createStore(reducer, composeEnhancers(
  applyMiddleware(logger)
))

