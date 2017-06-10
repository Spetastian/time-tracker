import { handleAjaxError } from '../utils/epicHelpers'

import {
    FETCH_USERS_REQUEST,
    fetchUsersSuccess,
		CREATE_USER_REQUEST,
		createUserSuccess,
		UPDATE_USER_REQUEST,
		updateUserSuccess,
		REMOVE_USER_REQUEST,
		removeUserSuccess
} from './actions'

import UserService from './UserService'
import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/observable/of'

const userService = new UserService()

const fetchUsersEpic = action$ =>
	action$.ofType(FETCH_USERS_REQUEST)
		.mergeMap(() =>
			userService.getUsers()
			.map(ajaxResponse => fetchUsersSuccess(ajaxResponse.response.data.users))
			.catch(handleAjaxError)
		)

const createUserEpic = action$ =>
	action$.ofType(CREATE_USER_REQUEST)
		.mergeMap((action) => {
			const { username, password, email, firstname, lastname, role } = action
			return userService.createNewUser({ username, password, email, firstname, lastname, role })
				.map(ajaxResponse => createUserSuccess(ajaxResponse.response.data.users))
				.catch(handleAjaxError)
		})

const updateUserEpic = action$ =>
	action$.ofType(UPDATE_USER_REQUEST)
		.mergeMap((action) => {
			const { id, username, email, firstname, lastname, role } = action
			return userService.saveUser({ id, username, email, firstname, lastname, role })
				.map(ajaxResponse => updateUserSuccess(ajaxResponse.response.data.users))
				.catch(handleAjaxError)
		})

const removeUserEpic = action$ =>
	action$.ofType(REMOVE_USER_REQUEST)
		.mergeMap(action =>
			userService.removeUser(action.id)
			.map(ajaxResponse => removeUserSuccess(ajaxResponse.response.data.users))
			.catch(handleAjaxError)
		)

export default combineEpics(
	fetchUsersEpic,
	createUserEpic,
	updateUserEpic,
	removeUserEpic
)

