import React from 'react'
import { Link } from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import moment from 'moment'

import * as authActions from './../../actions/auth'

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: this.props.authState.current_user.email,
            frequency: this.props.authState.current_user.frequency
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
        this.props.authActions.saveSettings({
            email: this.state.email,
            frequency: this.state.frequency
        })
    }

    render() {
        const user = this.props.authState.current_user
        return (
            <div>
                <h1>Disconnect Today</h1>
                <form action="" onSubmit={event => {
                    event.preventDefault()
                    this.handleSave()
                }}>
                    <p>I want to receive emails to <input type="text" placeholder="123@abc.com" value={this.state.email} onChange={event => {
                        this.handleEmailChange(event.target.value)
                    }} /> every <input type="text" placeholder="day" value={this.state.frequency} onChange={event => {
                        this.handleFrequencyChange(event.target.value)
                    }} /> with a digest of my @mentions and DMs</p>
                    <input type="submit" value="Save" />
                </form>
                {
                    !!(user.lastFetchedFromTwitter) && (
                        <p>Last ran { moment(user.lastFetchedFromTwitter).fromNow() }</p>
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
