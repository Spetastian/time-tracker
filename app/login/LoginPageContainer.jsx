import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import {
		authenticationRequest,
		signInRequest,
		signOutRequest
 } from '../common/auth'

import LoginForm from './components/LoginForm'
import styles from './loginPageContainer.scss'

class RegisterTimePageContainer extends Component {

	handleOnLogin = ({ username, password }) => {
		this.props.signIn({ username, password })
	}

	render() {
		return (
			<div className={styles.container}>
				<LoginForm className={styles.loginForm} onLogin={this.handleOnLogin} />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return state.auth
}

const mapDispatchToProps = (dispatch) => {
	return {
		redirectAuthenticated: () =>
						dispatch(replace('/')),
		authenticate: () =>
						dispatch(authenticationRequest()),
		signIn: ({ username, password }) =>
						dispatch(signInRequest({ username, password })),
		signOut: () =>
						dispatch(signOutRequest())
	}
}


export default connect(
		mapStateToProps,
		mapDispatchToProps
)(RegisterTimePageContainer)