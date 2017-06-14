import React, { Component } from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import { signOutRequest } from './actions'

class SignOutButtonContainer extends Component {

	handleOnSignoutPressed = () => {
		this.props.signOut()
	}

	renderSignOutButton = () =>
		<FlatButton label="Sign out" onTouchTap={this.handleOnSignoutPressed} />
	

	render() {
		console.log('SignOut props', this.props)
		return this.props.authenticated ? this.renderSignOutButton() : null
	}
}

const mapStateToProps = (state) => {
	return state.auth
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () =>
			dispatch(signOutRequest())
	}
}


export default connect(
		mapStateToProps,
		mapDispatchToProps
)(SignOutButtonContainer)