import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory} from 'react-router'
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux'
import ReduxToastr from 'react-redux-toastr'
import reducers from './reducers'
import {reducer as toastrReducer} from 'react-redux-toastr'

import localStore from 'store'

import App from './containers/app.jsx'
import Dashboard from './components/dashboard/index.jsx'
import Home from './components/home/index.jsx'
import FourOhFour from './components/404.jsx'

const loggerMiddleware = createLogger()

const reducer = combineReducers(Object.assign({}, reducers, {
    routing: routerReducer,
    toastr: toastrReducer
}))

const getStoreArgs = () => {
    if(config.NODE_ENV == 'production'){
        return compose(
            applyMiddleware(
                thunkMiddleware,
                routerMiddleware(browserHistory)
            )
        )
    }
    return compose(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware,
            routerMiddleware(browserHistory)
        )
    )
}

const store = createStore(
    reducer,
    getStoreArgs()
)
const history = syncHistoryWithStore(browserHistory, store)

history.listen(location => {
    if(config.NODE_ENV == 'production'){
        ga && ga.pageview && ga.pageview(location.pathname)
    }
})

const requireAuth = (nextState, replace) => {
    const isLoggedIn = store.getState().authState.logged_in

    if (!isLoggedIn) {
        replace({
            pathname: '/',
            state: {
                nextPathname: nextState.location.pathname
            }
        })
    }
}

const routes = {
    path: '/',
    component: App,
    indexRoute: {
        component: Home
    },
    childRoutes: [
        {
            path: 'dashboard',
            component: Dashboard,
            onEnter: requireAuth
        }, {
            path: '*',
            component: FourOhFour
        }
    ]
}

ReactDOM.render(
    <Provider store={store}>
    <div>
        <Router routes={routes} history={history}/>
        <ReduxToastr timeOut={4000} newestOnTop={false} position="top-right"/>
    </div>
</Provider>, document.getElementById('app'))
