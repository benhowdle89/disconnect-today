import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

import * as authActions from './../actions/auth'

import store from './../etc/store'

const inApp = pathname => ['dashboard'].some(r => pathname.match(new RegExp(r)))

const onHomepage = pathname => pathname == '/'

class App extends React.Component {

    render() {
        return <div>
            {
                this.props.children
            }
        </div>
    }
}

App.propTypes = {
    authActions: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
