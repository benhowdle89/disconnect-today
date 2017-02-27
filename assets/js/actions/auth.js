import {
    fetch
} from './../etc/fetch'
import store from './../etc/store'
import {
    actions as formActions
} from 'react-redux-form'
import { push } from 'react-router-redux'

import { toastr } from 'react-redux-toastr'

import * as messages from './../config/messages'
import * as pageActions from './page'
import * as types from '../constants/action-types'
import intercom from './../etc/intercom'

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

export function facebookReconnect() {
    return {
        type: types.FACEBOOK_RECONNECT
    }
}

export function facebookFetchPageInit(fbInfo) {
    return {
        type: types.FACEBOOK_FETCH_PAGE_INIT,
        fbInfo
    }
}

export function facebookPageFetched(page) {
    return {
        type: types.FACEBOOK_FETCHED_PAGE,
        page: page || []
    }
}

export function facebookConnected(current_user) {
    return {
        type: types.FACEBOOK_CONNECTED,
        current_user
    }
}

export function existingFacebookUser() {
    return {
        type: types.EXISTING_FACEBOOK_USER
    }
}

export function retryFacebook() {
    return {
        type: types.RETRY_FACEBOOK
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

export function cardUpdatingInit() {
    return {
        type: types.CARD_UPDATING
    }
}

export function cardUpdated(current_user) {
    return {
        type: types.CARD_UPDATED,
        current_user
    }
}

export function cardUpdatingError(error) {
    return {
        type: types.CARD_UPDATING_ERRORS,
        error
    }
}

export function updatePasswordInit() {
    return {
        type: types.UPDATING_PASSWORD
    }
}

export function updatedPasswordError(error) {
    return {
        type: types.UPDATED_PASSWORD_ERROR,
        error
    }
}

export function updatedPassword() {
    return {
        type: types.UPDATED_PASSWORD
    }
}

export function requestingPasswordReset() {
    return {
        type: types.REQUESTING_PASSWORD_RESET
    }
}

export function requestedPasswordResetErrors(errors) {
    return {
        type: types.REQUESTED_PASSWORD_RESET_ERRORS,
        errors
    }
}

export function requestedPasswordReset() {
    return {
        type: types.REQUESTED_PASSWORD_RESET
    }
}

export function changingPassword() {
    return {
        type: types.CHANGING_PASSWORD
    }
}

export function changedPasswordErrors(errors) {
    return {
        type: types.CHANGED_PASSWORD_ERRORS,
        errors
    }
}

export function changedPassword() {
    return {
        type: types.CHANGED_PASSWORD
    }
}

export function deleteAccountInit() {
    return {
        type: types.DELETE_ACCOUNT_INIT
    }
}

export function deletedAccount() {
    return {
        type: types.DELETED_ACCOUNT
    }
}

export function whoami() {
    return dispatch => fetch('api/whoami').then((json = {}) => {
        return json.user && dispatch(loggedIn(json.user)) && intercom.update(json.user)
    })
}

export function upgrade(stripeToken, planId) {
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

export function updateCustomerCard(stripeToken, card) {
    return (dispatch, getState) => {
        dispatch(cardUpdatingInit())
        return fetch('api/users/card-update', {
            body: {
                stripe_token_id: stripeToken,
                card
            }
        })
        .then(json => {
            if(json.error){
                return dispatch(cardUpdatingError(json.error))
            }
            if(json.user) {
                dispatch(cardUpdated(json.user))
                toastr.success('Congratulations', 'Your card details have been updated.')
            }
        })
    }
}

export function requestPasswordReset(email) {
    return dispatch => {
        dispatch(requestingPasswordReset())
        return fetch('api/users/request-password-reset', {
            body: {
                email
            }
        })
        .then(json => {
            if(json.error) {
                return dispatch(requestedPasswordResetErrors(json.error))
            }
            dispatch(requestedPasswordReset())
        })
    }
}

export function changePassword(new_password, reset_hash) {
    return dispatch => {
        dispatch(changingPassword())
        return fetch('api/users/change-password', {
            body: {
                reset_hash,
                new_password
            }
        })
        .then(json => {
            if(json.error) {
                return dispatch(changedPasswordErrors(json.error))
            }
            dispatch(changedPassword())
            toastr.success('Password changed', 'You can now login with your new Ekko password.')
            dispatch(push('/login'))
        })
    }
}

export function updatePassword(current_password, new_password) {
    return dispatch => {
        dispatch(updatePasswordInit())
        return fetch('api/users/password', {
            body: {
                current_password,
                new_password
            }
        })
        .then(json => {
            if(json.error){
                return dispatch(updatedPasswordError(json.error))
            }
            dispatch(updatedPassword())
        })
    }
}

export function deleteAccount() {
    return dispatch => {
        dispatch(deleteAccountInit())
        return fetch('api/users/cancel')
        .then(json => {
            toastr.info('Ok', 'Your account has been deleted. It\'s been emotional. Goodbye.')
            dispatch(deletedAccount())
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

export function signUp({
    email,
    password,
    firstName,
    lastName
}) {
    return (dispatch, getState) => {
        const {
            authState
        } = getState()

        dispatch(signUpInit())
        if (!email) {
            dispatch(formActions.batch('signUp', [
                formActions.setSubmitFailed('signUp'),
                setFieldsErrors('signUp', {
                    email: messages.FORM_EMAIL_NULL
                })
            ]))
        } else if (!password) {
            dispatch(formActions.batch('signUp', [
                formActions.setSubmitFailed('signUp'),
                setFieldsErrors('signUp', {
                    password: messages.FORM_PASSWORD_NULL
                })
            ]))
        } else if (!firstName) {
            dispatch(formActions.batch('signUp', [
                formActions.setSubmitFailed('signUp'),
                setFieldsErrors('signUp', {
                    firstName: messages.FORM_FIRST_NAME_NULL
                })
            ]))
        } else if (!lastName) {
            dispatch(formActions.batch('signUp', [
                formActions.setSubmitFailed('signUp'),
                setFieldsErrors('signUp', {
                    lastName: messages.FORM_LAST_NAME_NULL
                })
            ]))
        }
        return fetch('api/users/sign-up', {
                body: {
                    firstName,
                    lastName,
                    email,
                    password,
                    fbInfo: authState.fbInfo
                }
            })
            .then((json = {}) => {
                if (json.error) {
                    dispatch(formActions.batch('signUp', [
                        formActions.setSubmitFailed('signUp'),
                        formActions.setErrors('signUp', json.error)
                    ]))
                    dispatch(signUpFailed())
                    return setTimeout(() => dispatch(formActions.setErrors('signUp', false)), 3000)
                }
                if(json.user){
                    dispatch(formActions.batch('signUp', [
                        formActions.setSubmitted('signUp'),
                        formActions.reset('signUp')
                    ]))
                    dispatch(facebookPageFetched([]))
                    dispatch(signedUp(json.user))
                    dispatch(push('/connect-to-facebook'))
                    intercom.update(json.user)
                }
            }).catch(() => {
                dispatch(signUpFailed())
            })
    }
}

export function facebookFetchPage(params, opts = {
    fromHomepage: false
}) {
    return (dispatch, getState) => {
        params = params || {}
        dispatch(facebookFetchPageInit(params))
        return fetch('api/users/facebook/page', {
                body: {
                    facebook_id: params.id,
                    facebook_access_token: params.accessToken
                }
            })
            .then(json => {
                if(!json){
                    return
                }
                if(!opts.fromHomepage){
                    if(json.error){
                        return dispatch(push('/connect-to-facebook'))
                    }
                    if(!json.pages || !json.pages.length){
                        dispatch(facebookPageFetched([]))
                        return dispatch(push('/no-pages'))
                    }
                    dispatch(push('/pick-facebook-page'))
                }
                dispatch(facebookPageFetched(json.pages))
            }).catch(() => {
                dispatch(facebookPageFetched([]))
            })
    }
}

export function facebookConnect({
    facebook_id,
    facebook_access_token
}) {
    return (dispatch, getState) => {
        dispatch(signUpInit())
        const {
            authState
        } = getState()
        let body = {
            facebook_id,
            facebook_access_token
        }
        if(authState.current_user && authState.current_user.email){
            body.email = authState.current_user.email
        }
        return fetch('api/users/facebook/connect', {
                body
            })
            .then(json => {
                if(json.existing){
                    dispatch(signUpFailed())
                    return dispatch(existingFacebookUser())
                }
                if(json.error){
                    toastr.error('Uh oh', json.error)
                }
                if(!json.user){
                    return
                }
                dispatch(facebookConnected(json.user))
                dispatch(push('/pick-facebook-page'))
            })
    }
}
