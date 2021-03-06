import { requestError } from '../common/errors'
import { verifyAuthenticationFailure } from '../common/auth'
import { replace } from 'react-router-redux'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'

export const handleAjaxError = (ajaxError) => {
	console.error(ajaxError)
	if (ajaxError.status === 403)
		return Observable.of(replace('/'))
	else if (ajaxError.status === 401)
		return Observable.of(replace('/login'))

	const { message, request: { url } } = ajaxError
	return Observable.from([requestError({ message, url }), verifyAuthenticationFailure()])
}
