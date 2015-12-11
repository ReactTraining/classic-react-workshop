import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as reducers from '../reducers'
import logger from './logger'
import thunk from 'redux-thunk'

export default applyMiddleware(thunk, logger)(createStore)(combineReducers(reducers))

