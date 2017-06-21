import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import { Tabs, Tab } from 'material-ui/Tabs'
import WeekEntry from './WeekEntry'
import ProjectSelector from './ProjectSelector'
import EntryForm from './EntryForm'
import styles from './timeCard.scss'
import moment from 'moment'

class TimeCard extends Component {

	constructor(props) {
		super(props)
		this.startOfWeek = moment().startOf('isoweek')
		this.endOfWeek = moment().endOf('isoweek')
		const { month, year, week, days } = this.props.periods[0]
		this.state = { month, year, week, days }
	}

	handleTabChange = (tabValue) => {
		const period = this.props.periods
			.find(period => period.week === tabValue)
		const { week, month, year, days } = period

		this.props.onWeekChange(tabValue)
		this.setState({
			week,
			month,
			year,
			days
		})
	}

	handleOnEntrySubmited = ({ projectId, values }) => {
		const { month, year, week } = this.state

		this.props.onNewEntryAdded({
			projectId,
			week,
			month,
			year,
			values
		})
	}

	handleEntryRemoved = (id) => {
		const { month, year, week } = this.state
		this.props.onEntryRemoved({ id, month, year, week })
	}

	handleEntrySaved = ({ id, projectId, values }) => {
		const { month, year, week } = this.state

		this.props.onEntrySaved({
			id,
			projectId,
			week,
			month,
			year,
			values
		})

	}

	renderEntries() {
		return this.props.entries.map(entry =>
			<WeekEntry
				key={entry._id}
				id={entry._id}
				projectName={entry.projectId}
				days={entry.days}
				monthShortName={this.props.monthShortName}
				onEntryRemoved={this.handleEntryRemoved}
				projects={this.props.projects}
				onEntrySaved={this.handleEntrySaved}
			/>
		)
	}

	renderTabs() {
		return (
			<Tabs
				value={this.state.week}
				onChange={this.handleTabChange}
			>
				{this.props.periods.map((period, i) =>
					<Tab
						key={i}
						label={`${this.props.monthShortName} ${period.start}-${period.end}`}
						value={period.week}
					/>
				)}
			</Tabs>
		)
	}

	handlePrevWeekPressed = () => {
		this.startOfWeek = this.startOfWeek.add(1, 'weeks')
		this.endOfWeek = this.endOfWeek.add(1, 'weeks')
		this.props.onWeekChange(this.getWeekInfo())
	}

	handleNextWeekPressed = () => {
		this.startOfWeek = this.startOfWeek.subtract(1, 'weeks')
		this.endOfWeek = this.endOfWeek.subtract(1, 'weeks')
		this.props.onWeekChange(this.getWeekInfo())
	}

	getWeekInfo() {
		const startFormated = this.startOfWeek.format('MMM Do')
		const endFormated = this.endOfWeek.format('MMM Do')
		const weekNumber = this.startOfWeek.week()
		return { weekNumber, startFormated, endFormated }
	}

	render() {
		return (
			<div className={styles.container} >
				{this.renderTabs()}
				<Toolbar>
					<ToolbarGroup>
						<ToolbarSeparator />
						<ProjectSelector
							projects={this.props.projects}
							onProjectSelected={this.handleOnProjectSelected}
						/>
					</ToolbarGroup>
				</Toolbar>
				<EntryForm
					onSubmit={this.handleOnEntrySubmited}
					monthShortName={this.props.monthShortName}
					days={this.state.days}
					projects={this.props.projects}
				/>
				{this.renderEntries()}
			</div>
		)
	}

}

export default TimeCard
