import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import throlttle from 'lodash/throttle';
import rootReducer from '../reducers'
import { loadState, saveState } from './localStorage'

const persistedState = loadState();
export const history = createHistory()

const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  connectRouter(history)(rootReducer),
  persistedState,
  composedEnhancers,
)

store.subscribe(throlttle(() => {
  saveState({
    authentication: store.getState().authentication,
  });
}, 1000));

export default store;
