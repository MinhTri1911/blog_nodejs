import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import IndexReducer from './index-reducer'
import IndexSagas from './index-sagas'

import {
	checkIndexAuthorization,
	checkWidgetAuthorization,
} from './lib/checkauth'

import { Login, Register } from './pages/auth'
import { DashBoard } from './pages'

const sagaMiddleware = createSagaMiddleware()

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const store = createStore(
	IndexReducer,
	composeSetup(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(IndexSagas)



ReactDOM.render(
	<Provider store={ store }>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" name="Wellcome Page" render={(props) => <App location='/'/>}/>
				<Route exact path="/login" name="Login Page" render={(props) => <Login location='/auth'/>}/>
				<Route exact path="/register" name="Register Page" render={(props) => <Register location='/auth'/>}/>
				<Route onEnter={checkWidgetAuthorization(store)} exact path="/dashboard" name="Dashboard Page" component={DashBoard}/>
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
)


registerServiceWorker();
