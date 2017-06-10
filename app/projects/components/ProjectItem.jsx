import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ContentCreate from 'material-ui/svg-icons/content/create'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import styles from './projectItem.scss'

class ProjectItem extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			editMode: false,
			removeMode: false
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.name !== this.props.name)
			this.setState({
				editMode: false
			})
	}

	handleProjectEdit = () => {
		this.setState({
			name: this.props.name,
			editMode: true
		})
	}

	handleProjectEditDone = () => {
		const { id } = this.props
		const { name } = this.state
		this.props.onUpdate({ id, name })
	}

	handleProjectRemove = () => {
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
			name: evt.target.value
		})
	}

	renderRemoveButton = () => {
		if (this.state.editMode)
			return null
		return (
			<IconButton
				onTouchTap={this.handleProjectRemove}
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
					onTouchTap={this.handleProjectEditDone}
					iconStyle={{ color: '#3c763d' }}
				>
					<ActionCheckCircle />
				</IconButton>
			)

		return (
			<IconButton
				onTouchTap={this.handleProjectEdit}
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

	renderNameField = () =>
		<TextField
			className={styles.nameTextField}
			onChange={this.handleNameChange}
			value={this.state.name}
		/>

	renderNameLabel = () =>
		<p>{this.props.name}</p>

	renderItem = () =>
		<div className={styles.content}>
			<div className={styles.nameContainer}>
				{this.state.editMode ? this.renderNameField() : this.renderNameLabel()}
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

export default ProjectItem