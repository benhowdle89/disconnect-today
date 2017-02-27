import {
    fetch
} from './../etc/fetch'
import store from './../etc/store'
import { push } from 'react-router-redux'

import { toastr } from 'react-redux-toastr'

import * as types from '../constants/action-types'

export function loginInit() {
    return {
        type: types.LOGIN_INIT
    }
}

export function loginFailed() {
    return {
        type: types.LOGIN_FAILED
    }
}

export function loggedIn(current_user) {
    return {
        type: types.LOGGED_IN,
        current_user
    }
}

export function saveSettingsInit() {
    return {
        type: types.SAVING_SETTINGS
    }
}

export function savedSettings(current_user) {
    return {
        type: types.SAVED_SETTINGS,
        current_user
    }
}

export function saveSettingsErrors(errors) {
    return {
        type: types.SAVE_SETTINGS_ERRORS,
        errors
    }
}

export function upgradeInit() {
    return {
        type: types.UPGRADING
    }
}

export function upgraded(current_user) {
    return {
        type: types.UPGRADED,
        current_user
    }
}

export function upgradeErrors(error){
    return {
        type: types.UPGRADE_ERROR,
        error
    }
}

export function saveSettings({
    email,
    frequency
}) {
    return (dispatch, getState) => {

        dispatch(saveSettingsInit())

        return fetch('users/update', {
                body: {
                    email,
                    frequency
                }
            })
            .then(json => {
                if(json.error){
                    return dispatch(saveSettingsErrors(json.error))
                }
                if(json.user){
                    dispatch(savedSettings(json.user))
                    toastr.success('All done', 'Your settings have been saved.')
                }
            })
    }
}

export function upgrade(stripeToken) {
    return (dispatch, getState) => {

        dispatch(upgradeInit())

        return fetch('users/upgrade', {
                body: {
                    stripe_token_id: stripeToken,
                    plan_id: planId
                }
            })
            .then(json => {
                if(json.error){
                    return dispatch(upgradeErrors(json.error))
                }
                if(json.user){
                    dispatch(upgraded(json.user))
                    toastr.success('Congratulations', 'You\'re now a fully paid Ekko user. Let\'s get a domain name connected to your website.')
                }
            })
    }
}

export function logout() {
    store.clear()
    intercom.logout()
    return {
        type: types.LOGOUT
    }
}

export function login({
    email,
    password
}) {
    return dispatch => {
        dispatch(loginInit())
        if (!email) {
            dispatch(formActions.batch('login', [
                formActions.setSubmitFailed('login'),
                setFieldsErrors('login', {
                    email: messages.FORM_EMAIL_NULL
                })
            ]))
        } else if (!password) {
            dispatch(formActions.batch('login', [
                formActions.setSubmitFailed('login'),
                setFieldsErrors('login', {
                    password: messages.FORM_PASSWORD_NULL
                })
            ]))
        }
        return fetch('api/users/login', {
                body: {
                    email,
                    password
                }
            })
            .then((json = {}) => {
                if (json.error) {
                    dispatch(formActions.batch('login', [
                        formActions.setSubmitFailed('login'),
                        formActions.setErrors('login', json.error)
                    ]))
                    dispatch(loginFailed())
                    return setTimeout(() => dispatch(formActions.setErrors('login', false)), 3000)
                }
                if(json.user){
                    dispatch(formActions.batch('login', [
                        formActions.setSubmitted('login'),
                        formActions.reset('login')
                    ]))
                    dispatch(loggedIn(json.user))
                    dispatch(push('/dashboard'))
                    intercom.update(json.user)
                }
            }).catch(() => {
                dispatch(loginFailed())
            })
    }
}
