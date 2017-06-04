import { createStore, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable'
import rootReducer from './rootReducer'
import rootEpic from './rootEpic'
// import createLogger from 'redux-logger'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const routerBrowserhistoryMiddleware = routerMiddleware(history)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const epicMiddleware = createEpicMiddleware(rootEpic)

// const loggerMiddleware = createLogger()

export default function configureStore(/* preloadedState*/) {
	return createStore(
    rootReducer,
    // preloadedState,
    composeEnhancers(
        applyMiddleware(
            epicMiddleware,
            routerBrowserhistoryMiddleware
        // loggerMiddleware
        )
    )
  )
}