import React, { Component } from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './entryForm.scss'

class EntryForm extends Component {
	constructor(props) {
		super(props)
		const dayFields = this.props.days.reduce((acc, day) => {
			acc[`day${day.dayOfMonth}`] = day.amount
			return acc
		}, {})

		this.state = Object.assign({
			selectedProject: this.props.projects[0] && this.props.projects[0]._id
		}, dayFields)
	}

	handleCreateButtonPress = () => {
		const { selectedProject } = this.state
		const { days } = this.props
		const values = days.reduce((acc, day) => {
			acc.push({
				dayOfMonth: day.dayOfMonth,
				amount: this.state[`day${day.dayOfMonth}`]
			})
			return acc
		}, [])
		this.props.onSubmit({ projectId: selectedProject, values })
	}

	handleOnMenuItemSelected = (event, index, value) => {
		this.setState({
			selectedProject: value
		})
	}

	handleDayValueChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	renderProjectList() {
		return <DropDownMenu value={this.state.selectedProject} onChange={this.handleOnMenuItemSelected}>
			{this.props.projects.map((project, i) =>
				<MenuItem
					key={i}
					value={project._id}
					primaryText={project.name}
				/>
            )}
		</DropDownMenu>
	}

	renderDays() {
		return this.props.days.map(day =>
			<TextField
				name={`day${day.dayOfMonth}`}
				key={day.dayOfMonth}
				value={this.state[day.dayOfMonth]}
				onChange={this.handleDayValueChange}
				floatingLabelFixed
				floatingLabelText={`${this.props.monthShortName} ${day.dayOfMonth}`}
			/>
		)
	}

	render() {
		return <div className={styles.nameContainer}>
			{this.renderProjectList()}
			{this.renderDays()}
			<RaisedButton
				onTouchTap={this.handleCreateButtonPress}
				label="Create"
				secondary
			/>
		</div>
	}
}

export default EntryForm