import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ContentCreate from 'material-ui/svg-icons/content/create'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import styles from './userItem.scss'

class UserItem extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			editMode: false,
			removeMode: false
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.username !== this.props.username)
			this.setState({
				editMode: false
			})
	}

	handleUserEdit = () => {
		this.setState({
			username: this.props.username,
			editMode: true
		})
	}

	handleUserEditDone = () => {
		const { id } = this.props
		const { username } = this.state
		this.props.onUpdate({ id, username })
	}

	handleUserRemove = () => {
		this.setState({
			removeMode: true
		})
	}

	handleConfirmRemove = () => {
		this.props.onRemove(this.props.id)
	}

	handleCancelRemove = () => {
		this.setState({
			removeMode: false
		})
	}

	handleNameChange = (evt) => {
		this.setState({
			username: evt.target.value
		})
	}

	renderRemoveButton = () => {
		if (this.state.editMode)
			return null
		return (
			<IconButton
				onTouchTap={this.handleUserRemove}
				iconStyle={{ color: '#a94442' }}
			>
				<ActionDelete />
			</IconButton>
		)
	}

	renderEditButton = () => {
		if (this.state.editMode)
			return (
				<IconButton
					onTouchTap={this.handleUserEditDone}
					iconStyle={{ color: '#3c763d' }}
				>
					<ActionCheckCircle />
				</IconButton>
			)

		return (
			<IconButton
				onTouchTap={this.handleUserEdit}
				iconStyle={{ color: '#3c763d' }}
			>
				<ContentCreate />
			</IconButton>
		)
	}

	renderRemoveConfirm = () =>
		<div className={styles.content}>
			<RaisedButton
				onTouchTap={this.handleConfirmRemove}
				label="Remove"
			/>
			<RaisedButton
				onTouchTap={this.handleCancelRemove}
				label="Cancel"
			/>
		</div>

	renderUsernameField = () =>
		<TextField
			className={styles.usernameTextField}
			onChange={this.handleNameChange}
			value={this.state.username}
		/>

	renderUsernameLabel = () =>
		<p>{this.props.username}</p>

	renderItem = () =>
		<div className={styles.content}>
			<div className={styles.usernameContainer}>
				{this.state.editMode ? this.renderUsernameField() : this.renderUsernameLabel()}
			</div>
			<div className={styles.actionsContaier}>
				{this.renderEditButton()}
				{this.renderRemoveButton()}
			</div>
		</div>

	
	render = () =>
		<Paper className={styles.container} zDepth={this.props.editMode ? 2 : 1}>
			{this.state.removeMode ? this.renderRemoveConfirm() : this.renderItem()}
		</Paper>
}

export default UserItem