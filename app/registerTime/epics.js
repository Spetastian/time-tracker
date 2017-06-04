import { handleAjaxError } from '../utils/epicHelpers'

import {
    FETCH_TIME_CARD_REQUEST,
    fetchTimeCardSuccess,
    ADD_NEW_ENTRY_REQUEST,
    addNewEntrySuccess
} from './actions'

import TimeCardService from './TimeCardService'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/observable/of'

const timeCardService = new TimeCardService()

const fetchTimeCardEpic = action$ =>
	action$.ofType(FETCH_TIME_CARD_REQUEST)
		.mergeMap(action =>
			timeCardService.getTimeCard({
				weekNumber: action.weekNumber
			})
			.map(ajaxResponse => fetchTimeCardSuccess(ajaxResponse.response.entries))
			.catch(handleAjaxError)
		)

const addNewEntryEpic = action$ =>
	action$.ofType(ADD_NEW_ENTRY_REQUEST)
		.mergeMap(action =>
			timeCardService.addEntry({
				projectId: action.projectId,
				weekNumber: action.weekNumber
			})
			.map(ajaxResponse => addNewEntrySuccess(ajaxResponse.response))
			.catch(handleAjaxError)
		)

export default combineEpics(fetchTimeCardEpic, addNewEntryEpic)

