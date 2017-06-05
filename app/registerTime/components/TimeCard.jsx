import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import Paper from 'material-ui/Paper'
import WeekEntry from './WeekEntry'
import WeekSelector from './WeekSelector'
import ProjectSelector from './ProjectSelector'
import styles from './timeCard.scss'


class TimeCard extends Component {

	handleOnProjectSelected = (projectId) => {
		this.props.onNewEntryAdded(projectId)
	}

	renderEntries() {
		return this.props.entries.map(entry =>
			<WeekEntry
  key={entry.id}
  projectId={entry.projectId}
			/>
		)
	}

	render() {
		return (
			<div className={styles.container} >
				<WeekSelector
  weeksInYear={this.props.weeksInYear}
  selectedWeek={this.props.selectedWeek}
  onWeekSelected={this.props.onWeekChange}
				/>
				<Toolbar>
					<ToolbarGroup>
						<ToolbarTitle text="Actions" />
						<ToolbarSeparator />
						<ProjectSelector onProjectSelected={this.handleOnProjectSelected} />
					</ToolbarGroup>
				</Toolbar>
				{this.renderEntries()}
			</div>
		)
	}

}

export default TimeCard
