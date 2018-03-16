import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from "redux";
import * as reducers from "./reducers";
import logger from "./logger";

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers(reducers),
  composeEnhancers(applyMiddleware(logger))
);
