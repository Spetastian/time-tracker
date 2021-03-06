import React, { Component } from 'react'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)

import { connect } from 'react-redux'
import {
	fetchEntriesRequest,
	createEntryRequest,
	saveEntryRequest,
	removeEntryRequest
} from './actions'
import TimeCard from './components/TimeCard'
import FlatButton from 'material-ui/FlatButton'
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import { AuthRequiredContainer } from '../common/auth'
import styles from './registerTimePageContainer.scss'

class RegisterTimePageContainer extends Component {

	constructor(props) {
		super(props)
		this.state = this.updateDateInfo(moment())
	}

	componentDidMount() {
		this.props.loadEntries({
			week: this.state.selectedWeek,
			month: this.state.selectedMonth,
			year: this.state.selectedYear
		})
	}

	handleOnWeekChange = (week) => {

		this.setState({
			selectedWeek: week
		})

		this.props.loadEntries({
			week,
			month: this.state.selectedMonth,
			year: this.state.selectedYear
		})
	}

	handlePrevMonthPressed = () => {
		const prevMonth = moment({
			year: this.state.selectedYear,
			month: this.state.selectedMonth
		}).subtract(1, 'month')

		this.setState(this.updateDateInfo(prevMonth))
	}

	handleNextMonthPressed = () => {
		const nextMonth = moment({
			year: this.state.selectedYear,
			month: this.state.selectedMonth
		}).add(1, 'month')

		this.setState(this.updateDateInfo(nextMonth))
	}

	updateDateInfo(date) {

		const monthStarting = moment(date).startOf('month')
		const monthEnding = moment(date).endOf('month')

		const currentMonth = moment(date).month()
		const currentYear = moment(date).year()

		const monthRange = moment.range(monthStarting, monthEnding)
		const periods = []

		for (const week of monthRange.by('week')) {
			let startOfWeek = moment(week).startOf('isoweek')

			if (startOfWeek.month() < currentMonth)
				startOfWeek = moment(week).startOf('month')

			let endOfWeek = moment(week).endOf('isoweek')

			if (endOfWeek.month() > currentMonth)
				endOfWeek = moment(week).endOf('month')

			const startDate = startOfWeek.date()
			const endDate = endOfWeek.date()
			const weekNumber = startOfWeek.week()

			const weekRange = moment.range(startOfWeek, endOfWeek)
			const days = []

			for (const date of weekRange.by('day')) {
				days.push({
					dayOfMonth: date.date(),
					amount: 0
				})
			}

			periods.push({
				start: startDate,
				end: endDate,
				month: currentMonth,
				week: weekNumber,
				year: currentYear,
				days
			})

		}

		const title = monthStarting.format('MMMM YYYY')
		const monthShortName = monthStarting.format('MMM')
		const nextMonthTitle = moment(monthStarting).add(1, 'month').format('MMMM YYYY')
		const prevMonthTitle = moment(monthStarting).subtract(1, 'month').format('MMMM YYYY')

		return {
			selectedWeek: date.week(),
			title,
			nextMonthTitle,
			prevMonthTitle,
			monthShortName,
			periods,
			selectedYear: date.year(),
			selectedMonth: date.month()
		}
	}

	render() {
		return (
			<AuthRequiredContainer>
				<div >
					<h1>{this.state.title}</h1>
					<div className={styles.monthButtonsContainer}>
						<FlatButton
							icon={<NavigationChevronLeft />}
							labelPosition="after"
							className={styles.monthButton}
							onTouchTap={this.handlePrevMonthPressed}
							label={this.state.prevMonthTitle}
						/>
						<FlatButton
							icon={<NavigationChevronRight />}
							labelPosition="before"
							className={styles.monthButton}
							onTouchTap={this.handleNextMonthPressed}
							label={this.state.nextMonthTitle}
						/>
					</div>
					<div />
					<TimeCard
						monthShortName={this.state.monthShortName}
						periods={this.state.periods}
						projects={this.props.projects}
						entries={this.props.entries}
						weeksInYear={this.state.weeksInYear}
						selectedWeek={this.state.selectedWeek}
						days={this.state.days}
						onWeekChange={this.handleOnWeekChange}
						onNewEntryAdded={this.props.addNewEntry}
						onEntrySaved={this.props.saveEntry}
						onEntryRemoved={this.props.removeEntry}
					/>
				</div>
			</AuthRequiredContainer>
		)
	}
}

const mapStateToProps = (state) => {
	const { entries, loading } = state.registerTime
	const { projects } = state.auth
	return { projects, entries, loading }
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadEntries: ({ week, month, year }) =>
			dispatch(fetchEntriesRequest({ week, month, year })),
		addNewEntry: ({ projectId, week, values, month, year }) =>
			dispatch(createEntryRequest({ projectId, week, values, month, year })),
		saveEntry: ({ id, projectId, values, week, month, year }) =>
			dispatch(saveEntryRequest({ id, projectId, values, week, month, year })),
		removeEntry: ({ id, week, month, year }) =>
			dispatch(removeEntryRequest({ id, week, month, year }))
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RegisterTimePageContainer)