import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    fetchProjectsRequest,
    createProjectRequest,
		removeProjectRequest,
		updateProjectRequest
 } from './actions'

import { AuthRequiredContainer } from '../common/auth'
import Paper from 'material-ui/Paper'
import NewProjectForm from './components/NewProjectForm'
import ProjectItem from './components/ProjectItem'

import styles from './manageProjectsPageContainer.scss'

class ManageProjectsPageContainer extends Component {
    
	componentDidMount() {
		this.props.loadProjectList()
	}

	handleProjectAdded = (name) => {
		this.props.createNewProject(name)
	}

	handleProjectEdited = (name) => {
		this.props.createNewProject(name)
	}

	handleProjectRemoved = (id) => {
		this.props.removeProject(id)
	}

	handleProjectUpdated = ({ id, name }) => {
		this.props.updateProject({ id, name })
	}


	render() {
		console.log(this.props)
		return (
			<AuthRequiredContainer>
				<div>
					<NewProjectForm onProjectAdded={this.handleProjectAdded} />
					<div className={styles.container}>
						{this.props.projects.map(project =>
							<ProjectItem
								onRemove={this.handleProjectRemoved}
								onUpdate={this.handleProjectUpdated}
								key={project._id}
								id={project._id}
								name={project.name}
							/>
						)}
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
			dispatch(createProjectRequest(name)),
		removeProject: id =>
			dispatch(removeProjectRequest(id)),
		updateProject: ({ id, name }) =>
			dispatch(updateProjectRequest({ id, name }))
	}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageProjectsPageContainer)