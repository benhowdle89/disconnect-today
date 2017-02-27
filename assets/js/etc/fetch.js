require('es6-promise').polyfill()
import store from './store'
import fetchAPI from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import { toastr } from 'react-redux-toastr'

const API_URL = '/api/'

export const fetch = (url, opts = {}) => {
    let token = store.get('auth-token'),
        headers = {
            'Content-Type': 'application/json'
        }
    if (token) {
        headers['x-access-token'] = token
    }

    let body = opts.body || null

    let params = {
        headers
    }

    if(body){
        params.body = JSON.stringify(body)
        params.method = 'POST'
    }

    return fetchAPI(`${API_URL}${url}`, params).then(response => {
        return response.json().then(json => {
            return {
                status: response.status,
                response: json
            }
        })
    }).then(res => {
        if(res.status == 500){
            throw new Error(res.response.data.error)
        }
        if(res.status == 403){
            browserHistory.push('/')
            store.clear()
            return toastr.error('Sorry', res.response.data.error)
        }
        const { response } = res
        const { data } = response
        if (data.user && data.user.token) {
            store.set('auth-token', data.user.token)
        }
        if(res.status == 400){
            return data || {}
        }
        return data || {}
    }).catch(error => {
        console.error(error)
        toastr.error('Sorry', 'Something bad happened')
        throw new Error(error)
    })
}
