import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import WeekEntry from './WeekEntry'
import WeekSelector from './WeekSelector'

class TimeCard extends Component {
 
	handleOnNewEntryButtonClicked = () => {
		this.props.onNewEntryAdded()
	}

	renderEntries() {
		return this.props.entries.map(entry => <WeekEntry key={entry.id} />)
	}

	render() {
		return (
			<div>
				<WeekSelector
  weeksInYear={this.props.weeksInYear}
  selectedWeek={this.props.selectedWeek}
  onWeekSelected={this.props.onWeekChange}
				/>
				<Toolbar>
					<ToolbarGroup>
						<ToolbarTitle text="Actions" />
						<ToolbarSeparator />
						<RaisedButton
  onClick={this.handleOnNewEntryButtonClicked}
  label="+ New Entry"
  primary
						/>
					</ToolbarGroup>
				</Toolbar>
				{this.renderEntries()}
			</div>
		)
	}

}

export default TimeCard
