import React from 'react'
import { Link } from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import moment from 'moment'

import * as authActions from './../../actions/auth'

import Loading from './../loading.jsx'

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: this.props.authState.current_user.email,
            frequency: this.props.authState.current_user.frequency,
            saveSettingsErrors: this.props.authState.save_settings_errors
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.authState.save_settings_errors) {
            this.setState({
                saveSettingsErrors: nextProps.authState.save_settings_errors
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
        const errors = this.state.saveSettingsErrors
        const isLoading = this.props.authState.saving_settings || this.props.authState.upgrading
        const fullUser = this.props.authState.current_user.isFullUser
        return (
            <div>
                <h1>Disconnect Today</h1>
                <form action="" onSubmit={event => {
                    event.preventDefault()
                    fullUser && this.handleSave()
                }}>
                    {
                        !!(errors) && (
                            <p>{ errors }</p>
                        )
                    }
                    <p>[{ this.getStatus() }] I want to receive emails to <input type="text" placeholder="123@abc.com" value={this.state.email} onChange={event => {
                        this.handleEmailChange(event.target.value)
                    }} /> every <select value={ this.state.frequency } onChange={event => {
                        this.handleFrequencyChange(event.target.value)
                    }} name="frequency" id="">
                        {
                            ['day', '2_days', 'week'].map(f => <option value={ f }>{ f.replace(/_/, ' ') }</option>)
                        }
                    </select> with a digest of my @mentions and DMs</p>
                    <input disabled={ isLoading } type="submit" value="Save" />
                </form>
                {
                    isLoading && (
                        <Loading column>
                            { this.getLoadingMessage() }
                        </Loading>
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
