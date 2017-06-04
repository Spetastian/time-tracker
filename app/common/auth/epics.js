import { handleAjaxError } from '../../utils/epicHelpers'
import {
    SIGN_IN_REQUEST,
    SIGN_OUT_REQUEST,
		VERIFY_AUTHENTICATION,
    AUTHENTICATION_REQUEST,
    signInSuccess,
    signOutSuccess,
    authenticationSuccess
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

import AuthService from './AuthService'

const authService = new AuthService()

const authenticationVerifyEpic = action$ =>
    action$.ofType(VERIFY_AUTHENTICATION)
			.mergeMap(() =>
				authService.verifyToken()
					.map(() => authenticationSuccess())
					.catch((err) => {
						console.error(err)
						return Observable.of(replace('/'))
					})
				)
		
const authenticationRequestEpic = action$ =>
    action$.ofType(AUTHENTICATION_REQUEST)
        .mergeMap(() =>
            authService.authenticate()
                .map(() => authenticationSuccess())
								.catch(handleAjaxError)
        )

const signInRequestEpic = action$ =>
    action$.ofType(SIGN_IN_REQUEST)
        .mergeMap(action =>
            authService.signIn({ username: action.username, password: action.password })
								.flatMap(() => [signInSuccess(), replace('/')])
								.catch(handleAjaxError)
        )


export default combineEpics(
		authenticationVerifyEpic,
		authenticationRequestEpic,
		signInRequestEpic
)

