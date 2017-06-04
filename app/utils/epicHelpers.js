import { requestError } from '../common/errors'
import { replace } from 'react-router-redux'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'

export const handleAjaxError = (ajaxError) => {
	console.error(ajaxError)
	if (ajaxError.status === 403)
		return Observable.of(replace('/login'))
	else if (ajaxError.status === 401)
		return Observable.of(replace('/'))

	const { message, request: { url } } = ajaxError
	return Observable.of(requestError({ message, url }))
}