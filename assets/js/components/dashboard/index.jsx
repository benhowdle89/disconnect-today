import React from 'react'
import { Link } from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import moment from 'moment'

import * as authActions from './../../actions/auth'

import Loading from './../loading.jsx'
import Stripe from './stripe.jsx'

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: this.props.authState.current_user.email,
            frequency: this.props.authState.current_user.frequency || 'day',
            saveSettingsErrors: this.props.authState.save_settings_errors,
            upgradeError: this.props.authState.upgrade_error
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.authState.save_settings_errors) {
            this.setState({
                saveSettingsErrors: nextProps.authState.save_settings_errors
            })
        }
        if(nextProps.authState.upgrade_error) {
            this.setState({
                upgradeError: nextProps.authState.upgrade_error
            })
        }
    }

    handleEmailChange = email => {
        this.setState({
            email
        })
    }

    handleFrequencyChange = frequency => {
        this.setState({
            frequency
        })
    }

    handleSave = () => {
        if(!this.state.email) {
            return this.props.authActions.saveSettingsErrors('Please fill in your email address')
        }

        if(['day', '2_days', 'week'].indexOf(this.state.frequency) === -1) {
            return this.props.authActions.saveSettingsErrors('A valid frequency is required')
        }

        return this.props.authActions.saveSettings({
            email: this.state.email,
            frequency: this.state.frequency
        })
    }

    handleStripe = response => {
        if(response.id) {
            return this.props.authActions.upgrade(response.id, response.email)
        }
    }

    getStatus() {
        return this.props.authState.current_user.isFullUser ? 'active' : 'inactive'
    }

    getLoadingMessage() {
        if(this.props.authState.saving_settings) {
            return "Saving your preferences"
        }
        return "Activating your account"
    }

    render() {
        const user = this.props.authState.current_user
        const saveErrors = this.state.saveSettingsErrors
        const upgradeError = this.state.upgradeError
        const isLoading = this.props.authState.saving_settings || this.props.authState.upgrading
        const fullUser = this.props.authState.current_user.isFullUser
        return (
            <div>
                <form action="" onSubmit={event => {
                    event.preventDefault()
                    fullUser && this.handleSave()
                }}>
                    <fieldset disabled={!fullUser}>
                        {
                            !!(saveErrors || upgradeError) && (
                                <p>{ saveErrors || upgradeError }</p>
                            )
                        }
                        <p>[{ this.getStatus() }] I want to receive emails to <input type="text" placeholder="123@abc.com" value={this.state.email} onChange={event => {
                            this.handleEmailChange(event.target.value)
                        }} /> every <select value={ this.state.frequency } onChange={event => {
                            this.handleFrequencyChange(event.target.value)
                        }} name="frequency" id="">
                            {
                                ['day', '2_days', 'week'].map(f => <option key={ f } value={ f }>{ f.replace(/_/, ' ') }</option>)
                            }
                        </select> with a digest of my @mentions and DMs</p>
                        <button type="submit" disabled={ isLoading }>Save</button>
                    </fieldset>
                </form>
                {
                    isLoading && (
                        <Loading column>
                            { this.getLoadingMessage() }
                        </Loading>
                    )
                }
                {
                    !fullUser && (
                        <Stripe onToken={this.handleStripe} />
                    )
                }
                {
                    !!(user.lastFetchedFromTwitter) && (
                        <p>Twitter was last checked { moment(user.lastFetchedFromTwitter).fromNow() }</p>
                    )
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authState: state.authState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
