import React from 'react'
import { Link } from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as authActions from './../../actions/auth'

class Home extends React.Component {
    render() {
        const loggedIn = this.props.authState.logged_in
        return (
            <div>                
                {
                    loggedIn && (
                        <Link to="/dashboard">Dashboard</Link>
                    )
                }
                {
                    !loggedIn && (
                        <a href="/api/twitter-connect">Sign in with Twitter</a>
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
