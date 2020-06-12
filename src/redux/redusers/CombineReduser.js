import Auth from './Auth'
import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'

const reduces = {
    Auth,
    form: formReducer
}

export default combineReducers(reduces)