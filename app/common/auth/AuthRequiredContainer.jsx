import React, { Component } from 'react'
import { connect } from 'react-redux'
import { verifyAuthentication } from './actions'

class RegisterTimePageContainer extends Component {

	componentDidMount() {
		this.props.verifyAuthentication()
	}

	render() {
		return this.props.authenticated ? this.props.children : null
	}
}

const mapStateToProps = (state) => {
	return state.auth
}

const mapDispatchToProps = (dispatch) => {
	return {
		verifyAuthentication: () =>
						dispatch(verifyAuthentication())
	}
}


export default connect(
		mapStateToProps,
		mapDispatchToProps
)(RegisterTimePageContainer)