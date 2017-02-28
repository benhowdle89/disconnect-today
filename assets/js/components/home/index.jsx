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
                <div className="sell mb2">
                    <p className="h3 mb1">Sick of a distracting timeline?</p>
                    <p className="h3 mb1">Tempted to delete Twitter altogether?</p>
                    <p className="mb1"><span className="italic">Could do</span>...</p>
                    <p className="mb1">But what if someone wants to hire you? Or see if you're available for freelance work? It would be nice to see <span className="italic">those</span> messages.</p>
                    <p>And it would well and truly <span className="bold">suck</span> to miss those opportunities.</p>
                </div>

                <div className="blurb mb4">
                    <p className="mb2"><span className="bold">Disconnect Today</span> sends you an email digest of your recent @mentions and DMs, on a schedule that suits you.</p>
                    <ul className="mb2 left-align max-width-1 mx-auto">
                        <li><span>{`\u2014`}</span>No "popular tweets", or #moments.</li>
                        <li><span>{`\u2014`}</span>Receive your email digest every day, every 2 days, or just once a week.</li>
                        <li><span>{`\u2014`}</span>A one-off <em className="bold">$5</em> payment activates your account for life.</li>
                    </ul>
                </div>

                {
                    loggedIn && (
                        <Link className="button" to="/dashboard">Dashboard</Link>
                    )
                }
                {
                    !loggedIn && (
                        <div>
                            <p className="mb2">Sound good?</p>
                            <a className="button" href="/api/twitter-connect">Sign in with Twitter</a>
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
