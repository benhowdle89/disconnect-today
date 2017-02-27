import {
    LOGIN_INIT,
    LOGIN_FAILED,
    SIGN_UP_INIT,
    SIGN_UP_FAILED,
    LOGGED_IN,
    SIGNED_UP,
    LOGOUT,
    UPGRADED,
    UPGRADING,
    UPGRADE_ERROR,
    FACEBOOK_CONNECTED,
    EXISTING_FACEBOOK_USER,
    RETRY_FACEBOOK,
    FACEBOOK_FETCHED_PAGE,
    FACEBOOK_FETCH_PAGE_INIT,
    FACEBOOK_RECONNECT,
    UPDATING_PASSWORD,
    UPDATED_PASSWORD,
    UPDATED_PASSWORD_ERROR,
    DELETE_ACCOUNT_INIT,
    DELETED_ACCOUNT,
    REQUESTING_PASSWORD_RESET,
    REQUESTED_PASSWORD_RESET,
    REQUESTED_PASSWORD_RESET_ERRORS,
    CHANGING_PASSWORD,
    CHANGED_PASSWORD,
    CHANGED_PASSWORD_ERRORS,
    CARD_UPDATED,
    CARD_UPDATING,
    CARD_UPDATING_ERRORS
}
from '../constants/action-types'

import store from './../etc/store'

const initialState = {
    logged_in: !!(config.LOGGED_IN),
    logging_in: false,
    signing_up: false,
    current_user: config.LOGGED_IN || null,
    existing_facebook_user: false,
    facebookPages: [],
    fetchingFacebookPage: false,
    fetchedFacebookPage: false,
    fbInfo: {},
    upgrade_error: {},
    upgrading: false,
    updating_password: false,
    updated_password_error: {},
    updated_password: false,
    deleting_account: false,
    requesting_password_reset: false,
    requested_password_reset: false,
    requested_password_reset_errors: null,
    changing_password: false,
    changed_password: false,
    changed_password_errors: null,
    card_updating: false,
    card_updated: false,
    card_updating_error: {}
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
        case SIGN_UP_INIT:
            return Object.assign({}, state, {
                signing_up: true
            })
        case SIGN_UP_FAILED:
            return Object.assign({}, state, {
                signing_up: false
            })
        case LOGGED_IN:
            return Object.assign({}, state, {
                logged_in: true,
                logging_in: false,
                current_user: action.current_user
            })
        case SIGNED_UP:
            return Object.assign({}, state, {
                logged_in: true,
                signing_up: false,
                current_user: action.current_user
            })
        case FACEBOOK_RECONNECT:
            return Object.assign({}, state, {
                current_user: Object.assign({}, state.current_user, {
                    facebookUserId: null
                })
            })
        case FACEBOOK_FETCH_PAGE_INIT:
            return Object.assign({}, state, {
                fetchingFacebookPage: true,
                fetchedFacebookPage: false,
                fbInfo: action.fbInfo
            })
        case FACEBOOK_FETCHED_PAGE:
            return Object.assign({}, state, {
                fetchingFacebookPage: false,
                facebookPages: action.page,
                fetchedFacebookPage: true
            })
        case FACEBOOK_CONNECTED:
            return Object.assign({}, state, {
                current_user: action.current_user,
                signing_up: false,
                existing_facebook_user: false
            })
        case EXISTING_FACEBOOK_USER:
            return Object.assign({}, state, {
                existing_facebook_user: true
            })
        case RETRY_FACEBOOK:
            return Object.assign({}, state, {
                existing_facebook_user: false
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
        case CARD_UPDATING_ERRORS:
            return Object.assign({}, state, {
                card_updating: false,
                card_updating_error: action.error
            })
        case CARD_UPDATING:
            return Object.assign({}, state, {
                card_updating: true,
                card_updating_error: {}
            })
        case CARD_UPDATED:
            return Object.assign({}, state, {
                card_updating: false,
                card_updated: true,
                current_user: action.current_user
            })
        case UPDATING_PASSWORD:
            return Object.assign({}, state, {
                updating_password: true
            })
        case UPDATED_PASSWORD_ERROR:
            return Object.assign({}, state, {
                updating_password: false,
                updated_password_error: action.error
            })
        case UPDATED_PASSWORD:
            return Object.assign({}, state, {
                updating_password: false,
                updated_password_error: {},
                updated_password: true
            })
        case REQUESTING_PASSWORD_RESET:
            return Object.assign({}, state, {
                requesting_password_reset: true
            })
        case REQUESTED_PASSWORD_RESET:
            return Object.assign({}, state, {
                requesting_password_reset: false,
                requested_password_reset: true
            })
        case REQUESTED_PASSWORD_RESET_ERRORS:
            return Object.assign({}, state, {
                requesting_password_reset: false,
                requested_password_reset_errors: action.errors
            })
        case CHANGING_PASSWORD:
            return Object.assign({}, state, {
                changing_password: true
            })
        case CHANGED_PASSWORD:
            return Object.assign({}, state, {
                changing_password: false,
                changed_password: true
            })
        case CHANGED_PASSWORD_ERRORS:
            return Object.assign({}, state, {
                changing_password: false,
                changed_password_errors: action.errors
            })
        case LOGOUT:
        case DELETED_ACCOUNT:
            return {
                logged_in: false,
                logging_in: false,
                signing_up: false,
                current_user: null,
                existing_facebook_user: false,
                facebookPages: [],
                fetchingFacebookPage: false,
                fetchedFacebookPage: false,
                fbInfo: {},
                upgrade_error: {},
                upgrading: false
            }
        default:
            return state
    }
}
