import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    fetchPlayerListRequest,
    createPlayerRequest
 } from './actions'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import styles from './manageProjectsPageContainer.scss'

class ManageProjectsPageContainer extends Component {
    
	componentDidMount() {
		// this.props.loadUserList()
	}

	render() {
		return (
			<div>
				<div className={styles.container}>
					<Paper className={styles.item}>
						<TextField floatingLabelFixed floatingLabelText="Name" />
						<RaisedButton label="Add project" secondary />
					</Paper>
					<Paper className={styles.item}>
						<p>aifjai nilsson</p>
					</Paper>
					<Paper className={styles.item}>
						<p>aifjai nilsson</p>
					</Paper>
					<Paper className={styles.item}>
						<p>aifjai nilsson</p>
					</Paper>
					<Paper className={styles.item}>
						<p>aifjai nilsson</p>
					</Paper>
				</div>
			</div>

		)
	}
}

const mapStateToProps = (state) => {
	return state.manage
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadPlayerList: () =>
            dispatch(fetchPlayerListRequest()),
		createNewPlayer: name =>
            dispatch(createPlayerRequest(name))
	}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageProjectsPageContainer)