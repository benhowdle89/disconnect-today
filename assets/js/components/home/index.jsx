import React from 'react'
import { Link } from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as authActions from './../../actions/auth'

class Home extends React.Component {
    render() {
        const loggedIn = this.props.authState.logged_in
        return (
            <div className="center">
                <div className="mb3 center">
                    <p className="h3">Sick of a distracting timeline?</p>
                    <p className="h3">Tempted to delete Twitter altogether?</p>
                </div>

                <div className="sell mb2">
                    <p>You could, but what if someone wants to hire you? <br />What if you're available for freelance work?<br/> It would be nice to see those messages. <br/>It would well and truly suck to miss those opportunities.</p>
                </div>

                <div className="blurb mb3">
                    <p className="mb2">Disconnect Today sends you an email digest of your recent @mentions and DMs, no popular tweets or #moments, on a schedule that suits you.</p>
                </div>

                {
                    loggedIn && (
                        <Link className="button" to="/dashboard">Dashboard</Link>
                    )
                }
                {
                    !loggedIn && (
                        <div>
                            <p className="bold">A one-off $5 payment activates your account for life.</p>
                            <p>Sound good? <a className="button" href="/api/twitter-connect">Sign in with Twitter</a></p>
                            <p className="twitter-info mt4">* Disconnect Today requests a fair few permissions from your Twitter account. This is so it can read your DMs. We <span className="bold">never</span> post anything on your behalf. Promise.</p>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
