import React, { Component } from 'react'
import moment from 'moment'
import FlatButton from 'material-ui/FlatButton'
import styles from './weekSelector.scss'
import WeekList from './WeekList'
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more'

class WeekSelector extends Component {
	constructor(props) {
		super(props)

		this.state = {
			displayWeeks: false
		}
	}

	handleOnWeekSelected = (weekNumber) => {
		this.setState({
			displayWeeks: false
		})
		this.props.onWeekSelected({ weekNumber })
	}

	handleOnWeekButtonPressed = () => {
		this.setState({
			displayWeeks: !this.state.displayWeeks
		})
	}

	render() {
		const { displayWeeks } = this.state
		const { selectedWeek } = this.props

		const weeksVisibleStyle = {}

		if (!displayWeeks) {
			weeksVisibleStyle.display = 'none'
		}

		return (
			<div>
				<FlatButton
  label={`Week ${selectedWeek}`}
  onTouchTap={this.handleOnWeekButtonPressed}
  icon={<NavigationExpandMore />}
				/>
				<div style={weeksVisibleStyle}>
					<WeekList
  weeksInYear={this.props.weeksInYear}
  selectedWeek={selectedWeek}
  pageSize={20}
  onWeekSelected={this.handleOnWeekSelected}
					/>
				</div>
			</div>
		)
	}
}

export default WeekSelector