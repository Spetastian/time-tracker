import { handleAjaxError } from '../utils/epicHelpers'

import {
    FETCH_PROJECTS_REQUEST,
    fetchProjectsSuccess,
		CREATE_PROJECT_REQUEST,
		createProjectSuccess
} from './actions'

import ProjectService from './ProjectService'
import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/observable/of'

const projectService = new ProjectService()


const fetchProjectsEpic = action$ =>
	action$.ofType(FETCH_PROJECTS_REQUEST)
		.mergeMap(() =>
			projectService.getProjects()
			.map(ajaxResponse => fetchProjectsSuccess(ajaxResponse.response.projects))
			.catch(handleAjaxError)
		)

const createProjectEpic = action$ =>
	action$.ofType(CREATE_PROJECT_REQUEST)
		.mergeMap(action =>
			projectService.createNewProject(action.name)
			.map(ajaxResponse => createProjectSuccess(ajaxResponse.response.projects))
			.catch(handleAjaxError)
		)

export default combineEpics(fetchProjectsEpic, createProjectEpic)

