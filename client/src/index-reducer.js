import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import client from './client/reducer'
import login from './pages/auth/login/reducer'

const IndexReducer = combineReducers({
    client,
    login,
    form
})

export default IndexReducer
