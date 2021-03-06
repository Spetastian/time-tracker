import { handleAjaxError } from '../../utils/epicHelpers'
import {
    SIGN_IN_REQUEST,
    SIGN_OUT_REQUEST,
	VERIFY_AUTHENTICATION,
	verifyAuthenticationSuccess,
	verifyAuthenticationFailure,
    signInSuccess,
    signOutSuccess
} from './actions'

import { replace } from 'react-router-redux'
import { combineEpics } from 'redux-observable'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/from'

import AuthService from './AuthService'

const authService = new AuthService()

const authenticationVerifyEpic = action$ =>
    action$.ofType(VERIFY_AUTHENTICATION)
			.mergeMap(() =>
				authService.verifyToken()
					.map(() => verifyAuthenticationSuccess())
					.catch((err) => {
						return Observable.from([replace('/login'), verifyAuthenticationFailure()])
					})
				)
		
const signInRequestEpic = action$ =>
    action$.ofType(SIGN_IN_REQUEST)
        .mergeMap(action =>
            authService.signIn({ username: action.username, password: action.password })
				.flatMap(ajaxResponse => [signInSuccess(ajaxResponse.response.data), replace('/')])
				.catch(handleAjaxError)
        )
		
const signOutRequestEpic = action$ =>
    action$.ofType(SIGN_OUT_REQUEST)
		.do(authService.signOut)
		.flatMap(ajaxResponse => [signOutSuccess(), replace('/login')])
		.catch(console.error)

export default combineEpics(
		authenticationVerifyEpic,
		signInRequestEpic,
		signOutRequestEpic
)

