import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as reducers from './reducers'
import logger from './logger'

const createStoreWithMiddleware = applyMiddleware(logger)(createStore)
const reducer = combineReducers(reducers)

export default createStoreWithMiddleware(reducer)
