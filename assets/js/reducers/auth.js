import {
    LOGIN_INIT,
    LOGIN_FAILED,
    LOGGED_IN,
    UPGRADED,
    UPGRADING,
    UPGRADE_ERROR,
    SAVING_SETTINGS,
    SAVED_SETTINGS,
    SAVE_SETTINGS_ERRORS
}
from '../constants/action-types'

import store from './../etc/store'

const initialState = {
    logged_in: !!(config.LOGGED_IN),
    logging_in: false,
    current_user: config.LOGGED_IN || null,
    upgrade_error: null,
    upgrading: false,
    saving_settings: false,
    save_settings_errors: null
}

export default function authState(state = initialState, action) {
    switch (action.type) {
        case LOGIN_INIT:
            return Object.assign({}, state, {
                logging_in: true
            })
        case LOGIN_FAILED:
            return Object.assign({}, state, {
                logging_in: false
            })
        case LOGGED_IN:
            return Object.assign({}, state, {
                logged_in: true,
                logging_in: false,
                current_user: action.current_user
            })
        case SAVING_SETTINGS:
            return Object.assign({}, state, {
                saving_settings: true
            })
        case SAVED_SETTINGS:
            return Object.assign({}, state, {
                saving_settings: false,
                current_user: action.current_user
            })
        case SAVE_SETTINGS_ERRORS:
            return Object.assign({}, state, {
                saving_settings: false,
                save_settings_errors: action.errors
            })
        case UPGRADING:
            return Object.assign({}, state, {
                upgrading: true
            })
        case UPGRADED:
            return Object.assign({}, state, {
                current_user: action.current_user,
                upgrading: false
            })
        case UPGRADE_ERROR:
            return Object.assign({}, state, {
                upgrading: false,
                upgrade_error: action.error
            })
        default:
            return state
    }
}
