import React, { Component } from 'react'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)

import { connect } from 'react-redux'
import {
	fetchTimeCardRequest,
	addNewEntryRequest
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
		// this.props.loadTimeCard({ weekNumber: this.state.selectedWeek })
	}

	handleOnNewEntryAdded = (projectId) => {
		this.props.addNewEntry({
			projectId,
			weekNumber: this.state.selectedWeek
		})
	}

	handleOnWeekChange = ({ weekNumber, startFormated, endFormated }) => {

		this.setState({
			selectedWeek: weekNumber,
			startFormated,
			endFormated
		})
		this.props.loadTimeCard({ weekNumber })
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

			periods.push({
				start: startDate,
				end: endDate,
				month: currentMonth + 1,
				week: weekNumber
			})

		}

		const title = monthStarting.format('MMMM YYYY')
		const shortMonthName = monthStarting.format('MMM')
		const nextMonthTitle = moment(monthStarting).add(1, 'month').format('MMMM YYYY')
		const prevMonthTitle = moment(monthStarting).subtract(1, 'month').format('MMMM YYYY')

		return {
			selectedWeek: 1,
			title,
			nextMonthTitle,
			prevMonthTitle,
			shortMonthName,
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
						monthTitle={this.state.shortMonthName}
						periods={this.state.periods}
						entries={this.props.entries}
						weeksInYear={this.state.weeksInYear}
						selectedWeek={this.state.selectedWeek}
						onWeekChange={this.handleOnWeekChange}
						onNewEntryAdded={this.handleOnNewEntryAdded}
					/>
				</div>
			</AuthRequiredContainer>
		)
	}
}

const mapStateToProps = (state) => {
	return state.registerTime
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadTimeCard: ({ weekNumber }) =>
			dispatch(fetchTimeCardRequest({ weekNumber })),
		addNewEntry: ({ weekNumber, projectId }) =>
			dispatch(addNewEntryRequest({ weekNumber, projectId }))
	}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterTimePageContainer)