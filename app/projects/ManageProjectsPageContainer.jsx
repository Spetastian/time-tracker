import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    fetchProjectsRequest,
    createProjectRequest
 } from './actions'

import { AuthRequiredContainer } from '../common/auth'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import NewProjectForm from './components/NewProjectForm'

import styles from './manageProjectsPageContainer.scss'

class ManageProjectsPageContainer extends Component {
    
	componentDidMount() {
		this.props.loadProjectList()
	}

	handleProjectAdded = (name) => {
		this.props.createNewProject(name)
	}

	render() {
		return (
			<AuthRequiredContainer>
				<div>
					<NewProjectForm onProjectAdded={this.handleProjectAdded} />
					<div className={styles.container}>
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
			</AuthRequiredContainer>

		)
	}
}

const mapStateToProps = (state) => {
	return state.projects
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadProjectList: () =>
            dispatch(fetchProjectsRequest()),
		createNewProject: name =>
            dispatch(createProjectRequest(name))
	}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageProjectsPageContainer)