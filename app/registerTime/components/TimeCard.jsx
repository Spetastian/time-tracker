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
		this.state = {
			selectedWeek: this.props.periods[0].week,
			days: this.props.periods[0].days
		}
	}

	handleOnProjectSelected = (projectId) => {
		const period = this.props.periods
			.find(period => period.week === this.state.selectedWeek)
		
		const { start, end, month, year, week } = period
		
		this.props.onNewEntryAdded({
			projectId,
			week,
			startDay: start,
			endDay: end,
			month,
			year
		})
	}

	handleTabChange = (tabValue) => {
		const period = this.props.periods
			.find(period => period.week === this.state.selectedWeek)
		this.props.onWeekChange(tabValue)
		this.setState({ 
			selectedWeek: tabValue,
			days: period.days
		 })
	}

	handleEntryRemoved = (id) => {
		const period = this.props.periods
			.find(period => period.week === this.state.selectedWeek)
		
		const { month, year, week } = period
		this.props.onEntryRemoved({ id, month, year, week })
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
			/>
		)
	}

	renderTabs() {
		return (
			<Tabs
				value={this.state.selectedWeek}
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
					monthShortName={this.props.monthShortName}
					days={this.state.days} 
					projects={this.props.projects} />
				{this.renderEntries()}
			</div>
		)
	}

}

export default TimeCard
