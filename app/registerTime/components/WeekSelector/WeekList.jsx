import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import styles from './weekList.scss'

class WeekList extends Component {
	constructor(props) {
		super(props)

		const { pageSize, selectedWeek } = this.props

		this.state = {
			page: Math.ceil((selectedWeek || 1) / (pageSize || 1))
		}
	}

	handleOnWeekSelected = (evt) => {
		const selectedWeek = Number(evt.target.innerText)
		if (!Number.isNaN(selectedWeek))
			this.props.onWeekSelected(selectedWeek)
	}

	render() {
		const { pageSize, selectedWeek, weeksInYear } = this.props
		const last = this.state.page * pageSize
		const first = last - pageSize + 1
		const weekButtons = []
		for (let i = first; i <= last || last > weeksInYear && i <= weeksInYear; i++) {
			weekButtons.push(<FlatButton onTouchTap={this.handleOnWeekSelected} primary={i === selectedWeek} key={i} label={i} />)
		}
		return (
			<Paper zDepth={2} className={styles.container}>
				{weekButtons}
			</Paper>
		)
	}
}

export default WeekList