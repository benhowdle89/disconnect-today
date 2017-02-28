import {
    fetch
} from './../etc/fetch'
import store from './../etc/store'
import { push } from 'react-router-redux'

import { toastr } from 'react-redux-toastr'

import * as types from '../constants/action-types'

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

export function upgrade(stripeToken, email) {
    return (dispatch, getState) => {

        dispatch(upgradeInit())

        return fetch('users/upgrade', {
                body: {
                    stripe_token_id: stripeToken,
                    email
                }
            })
            .then(json => {
                if(json.error){
                    return dispatch(upgradeErrors(json.error))
                }
                if(json.user){
                    dispatch(upgraded(json.user))
                    toastr.success('Thanks', 'Your account has been activated. Enjoy your digest emails!')
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
