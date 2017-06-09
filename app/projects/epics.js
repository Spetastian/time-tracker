import { handleAjaxError } from '../utils/epicHelpers'

import {
    FETCH_PROJECTS_REQUEST,
    fetchProjectsSuccess
} from './actions'

import ProjectService from './ProjectService'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/observable/of'

const projectService = new ProjectService()


const fetchProjectsEpic = action$ =>
	action$.ofType(FETCH_PROJECTS_REQUEST)
		.mergeMap(action =>
			projectService.getProjects()
			.map(ajaxResponse => fetchProjectsSuccess(ajaxResponse.response.projects))
			.catch(handleAjaxError)
		)

export default combineEpics(fetchProjectsEpic)

