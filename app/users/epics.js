import { handleAjaxError } from '../utils/epicHelpers'

import {
    FETCH_USERS_REQUEST,
    fetchUsersSuccess
} from './actions'

import UserService from './UserService'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/observable/of'

const userService = new UserService()

const fetchUsersEpic = action$ =>
	action$.ofType(FETCH_USERS_REQUEST)
		.mergeMap(action =>
			userService.getUsers()
			.map(ajaxResponse => fetchUsersSuccess(ajaxResponse.response.users))
			.catch(handleAjaxError)
		)


export default combineEpics(fetchUsersEpic)
