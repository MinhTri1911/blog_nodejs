import { setClient } from '../client/actions'

function checkAuthorization (dispatch) {
    // attempt to grab the token from localstorage
    const storedToken = localStorage.getItem('x-auth')

    // if it exists
    if (storedToken) {
        // parse it down into an object
        const token = storedToken

        // this just all works to compare the total seconds of the created
        // time of the token vs the ttl (time to live) seconds
        const createdDate = new Date(token.created)
        const created = Math.round(createdDate.getTime() / 1000)
        const ttl = 1209600
        const expiry = created + ttl

        // if the token has expired return false
        if (created > expiry) return false

        // otherwise, dispatch the token to our setClient action
        // which will update our redux state with the token and return true
        dispatch(setClient(token))

        return true
    }

    return false
}

export function checkIndexAuthorization ({ dispatch }) {
    // by having a function that returns a function we satisfy 2 goals:
    //
    // 1. grab access to our Redux Store and thus Dispatch to call actions
    // 2. Return a function that includes all the proper .. properties that
    //    React Router expects for us to include and use
    //
    // `nextState` - the next "route" we're navigating to in the router
    // `replace` - a helper to change the route
    // `next` - what we call when we're done messing around
    //
    return (nextState, replace, next) => {
        // we'll make this in a minute - remember begin with the end!
        // If we pass the authentication check, go to widgets
        if (checkAuthorization(dispatch)) {
            replace('dasboard')

            return next()
        }

        // Otherwise let's take them to login!
        replace('login')

        return next()
    }
}

export function checkWidgetAuthorization ({ dispatch, getState }) {
    console.log(getState().client)
    return (nextState, replace, next) => {
        // reference to the `client` piece of state
        const client = getState().client

        // is it defined and does it have a token? good, go ahead to widgets
        console.log(123345345345)
        if (client && client.token != null) return next()

        // not set yet?  Let's try and set it and if so, go ahead to widgets
        if (checkAuthorization(dispatch)) return next()
        console.log('aaa')
        // nope?  okay back to login ya go.
        replace('login')

        return next()
    }
}
