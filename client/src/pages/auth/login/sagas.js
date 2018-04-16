import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'

// We'll use this function to redirect to different routes based on cases
import { browserHistory } from 'history/createBrowserHistory'

// Helper for api errors
// import { handleApiErrors } from '../lib/api-errors'
import { Api } from '../../../api/request'

// Our login constants
import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants'

// So that we can modify our Client piece of state
import { setClient, unsetClient } from '../../../client/actions'

import { CLIENT_UNSET } from '../../../client/constants'

function loginApi (email, password) {
    return Api.post('login', {email: email, password: password})
}

function* logout () {
    // dispatches the CLIENT_UNSET action
    yield put(unsetClient())

    // remove our token
    localStorage.removeItem('x-auth')

    // redirect to the /login screen
    browserHistory.push('/login')
}

function* loginFlow (email, password) {
    let user

    try {
        // try to call to our loginApi() function.  Redux Saga
        // will pause here until we either are successful or
        // receive an error
        user = yield call(loginApi, email, password)
        console.log(user, user.tokens[0].token)
        // inform Redux to set our client token, this is non blocking so...
        yield put(setClient(user))

        // .. also inform redux that our login was successful
        yield put({ type: LOGIN_SUCCESS })

        // set a stringified version of our token to localstorage on our domain
        localStorage.setItem('x-auth', user.tokens[0].token)

        // redirect them to WIDGETS!
        browserHistory.push('/dasboard')
    } catch (error) {
        // error? send it to redux
        yield put({ type: LOGIN_ERROR, error })
    } finally {
        // No matter what, if our `forked` `task` was cancelled
        // we will then just redirect them to login
        if (yield cancelled()) {
            browserHistory.push('/login')
        }
    }

    // return the token for health and wealth
    return user.tokens[0].token
}

// Our watcher (saga).  It will watch for many things.
function* loginWatcher () {

    while (true) {

        const { email, password } = yield take(LOGIN_REQUESTING)
        const task = yield fork(loginFlow, email, password)
        const action = yield take([CLIENT_UNSET, LOGIN_ERROR])

        if (action.type === CLIENT_UNSET) yield cancel(task)

        yield call(logout)
    }
}

export default loginWatcher
