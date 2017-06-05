import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { fetchTimeCardRequest, addNewEntryRequest } from './actions'
import TimeCard from './components/TimeCard'
import { AuthRequiredContainer } from '../common/auth'
import styles from './registerTimePageContainer.scss'

class RegisterTimePageContainer extends Component {
    
	constructor(props) {
		super(props)

		const weeksInYear = moment().weeksInYear()
		const currentWeek = moment().week()

		this.state = {
			weeksInYear,
			selectedWeek: currentWeek
		}
	}

	componentDidMount() {
		this.props.loadTimeCard({ weekNumber: this.state.selectedWeek })
	}

	handleOnNewEntryAdded = (projectId) => {
		this.props.addNewEntry({
			projectId,
			weekNumber: this.state.selectedWeek
		})
	}

	handleOnWeekChange = ({ weekNumber }) => {
		this.setState({
			selectedWeek: weekNumber
		})
		this.props.loadTimeCard({ weekNumber })
	}

	render() {
		return (
			<AuthRequiredContainer>
				<div className={styles.container} >
					<TimeCard
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