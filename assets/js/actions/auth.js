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

export function signUpInit() {
    return {
        type: types.SIGN_UP_INIT
    }
}

export function signUpFailed() {
    return {
        type: types.SIGN_UP_FAILED
    }
}

export function loggedIn(current_user) {
    return {
        type: types.LOGGED_IN,
        current_user
    }
}

export function signedUp(current_user) {
    return {
        type: types.SIGNED_UP,
        current_user
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

export function upgrade(stripeToken) {
    return (dispatch, getState) => {

        dispatch(upgradeInit())

        return fetch('api/users/upgrade', {
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
