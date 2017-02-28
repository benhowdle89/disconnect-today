import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

import * as authActions from './../actions/auth'

import Header from './../components/header.jsx'
import Footer from './../components/footer.jsx'

const inApp = pathname => ['dashboard'].some(r => pathname.match(new RegExp(r)))

const onHomepage = pathname => pathname == '/'

class App extends React.Component {

    render() {
        return <div className="max-width-2 mx-auto p2">
            <Header />
            {
                this.props.children
            }
            <Footer />
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
