import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ContentCreate from 'material-ui/svg-icons/content/create'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import styles from './weekEntry.scss'

class WeekEntry extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			editMode: false,
			removeMode: false
		}
	}

	handleEntryEdit = () => {
		this.setState({
			editMode: true
		})
	}

	handleEntryEditDone = () => {
		const { id } = this.props
		const { name } = this.state
		// this.props.onUpdate({ id, name })
	}

	handleEntryRemove = () => {
		this.setState({
			removeMode: true
		})
	}

	handleConfirmRemove = () => {
		// this.props.onRemove(this.props.id)
	}

	handleCancelRemove = () => {
		this.setState({
			removeMode: false
		})
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

	renderRemoveButton = () => {
		if (this.state.editMode)
			return null
		return (
			<IconButton
				onTouchTap={this.handleEntryRemove}
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
					onTouchTap={this.handleEntryEditDone}
					iconStyle={{ color: '#3c763d' }}
				>
					<ActionCheckCircle />
				</IconButton>
			)

		return (
			<IconButton
				onTouchTap={this.handleEntryEdit}
				iconStyle={{ color: '#3c763d' }}
			>
				<ContentCreate />
			</IconButton>
		)
	}

	renderItem = () =>
		<div className={styles.content}>
			<div className={styles.nameContainer}>
				{this.state.editMode ? this.renderDays() : this.renderDays()}
			</div>
			<div className={styles.actionsContaier}>
				{this.renderEditButton()}
				{this.renderRemoveButton()}
			</div>
		</div>

	renderDays() {
		return this.props.days.map(day =>
			<TextField
				key={day.dayOfMonth}
				value={day.amount}
				floatingLabelFixed
				floatingLabelText={`${this.props.monthShortName} ${day.dayOfMonth}`}
			/>
		)
	}
	render = () =>
		<Paper className={styles.container}>
			{this.state.removeMode ? this.renderRemoveConfirm() : this.renderItem()}
		</Paper>
}


export default WeekEntry