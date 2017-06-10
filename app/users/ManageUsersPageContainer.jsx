import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    fetchUsersRequest,
    createUserRequest,
		removeUserRequest,
		updateUserRequest
 } from './actions'

import { AuthRequiredContainer } from '../common/auth'
import NewUserForm from './components/NewUserForm'
import UserItem from './components/UserItem'

import styles from './manageUsersPageContainer.scss'

class ManageUsersPageContainer extends Component {
    
	componentDidMount() {
		this.props.loadUserList()
	}

	handleUserAdded = (user) => {
		this.props.createNewUser(user)
	}

	handleUserUpdated = (user) => {
		this.props.updateUser(user)
	}

	handleUserRemoved = (id) => {
		this.props.removeUser(id)
	}


	render() {
		return (
			<AuthRequiredContainer>
				<div>
					<NewUserForm onUserAdded={this.handleUserAdded} />
					<div className={styles.container}>
						{this.props.users.map(user =>
							<UserItem
								onRemove={this.handleUserRemoved}
								onUpdate={this.handleUserUpdated}
								key={user._id}
								id={user._id}
								username={user.username}
							/>
						)}
					</div>
				</div>
			</AuthRequiredContainer>

		)
	}
}

const mapStateToProps = (state) => {
	return state.users
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadUserList: () =>
			dispatch(fetchUsersRequest()),
		createNewUser: user =>
			dispatch(createUserRequest(user)),
		removeUser: id =>
			dispatch(removeUserRequest(id)),
		updateUser: user =>
			dispatch(updateUserRequest(user))
	}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageUsersPageContainer)