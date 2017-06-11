import { handleAjaxError } from '../utils/epicHelpers'

import {
    FETCH_WEEK_REQUEST,
    fetchWeekSuccess,
    CREATE_ENTRY_REQUEST,
    createEntrySuccess,
		SAVE_ENTRY_REQUEST,
		saveEntrySuccess,
		REMOVE_ENTRY_REQUEST,
		removeEntrySuccess
} from './actions'

import TimeService from './TimeService'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/observable/of'

const timeService = new TimeService()

const fetchWeekEpic = action$ =>
	action$.ofType(FETCH_WEEK_REQUEST)
		.mergeMap(action =>
			timeService.getEntries({
				weekNumber: action.weekNumber
			})
			.map(ajaxResponse => fetchWeekSuccess(ajaxResponse.response.data.entries))
			.catch(handleAjaxError)
		)

const createEntryEpic = action$ =>
	action$.ofType(CREATE_ENTRY_REQUEST)
		.mergeMap(action =>
			timeService.addEntry({
				projectId: action.projectId,
				weekNumber: action.weekNumber
			})
			.map(ajaxResponse => createEntrySuccess(ajaxResponse.response.data.entries))
			.catch(handleAjaxError)
		)

const saveEntryEpic = action$ =>
	action$.ofType(SAVE_ENTRY_REQUEST)
		.mergeMap(action =>
			timeService.saveEntry({
				id: action.id,
				weekNumber: action.weekNumber
			})
			.map(ajaxResponse => saveEntrySuccess(ajaxResponse.response.data.entries))
			.catch(handleAjaxError)
		)

const removeEntryEpic = action$ =>
	action$.ofType(REMOVE_ENTRY_REQUEST)
		.mergeMap(action =>
			timeService.saveEntry({
				id: action.id,
				weekNumber: action.weekNumber
			})
			.map(ajaxResponse => removeEntrySuccess(ajaxResponse.response.data.entries))
			.catch(handleAjaxError)
		)

export default combineEpics(
	fetchWeekEpic,
	createEntryEpic,
	saveEntryEpic,
	removeEntryEpic
)

