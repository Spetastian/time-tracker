import cookies from 'js-cookie'
import { Observable } from 'rxjs/Observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/empty'

class BaseService {

	constructor(name) {
		this.baseUrl = `http://localhost:3000/${name}`
	}


	verifyToken() {
		if (!this.getToken())
			return Observable.throw(new Error('Token not found'))

		return Observable.of(true)
	}

	getToken() {
		return cookies.get('token')
	}

	setToken(token) {
		cookies.set('token', token)
	}

	deleteToken = () => {
		cookies.remove('token')
	}

	getAjaxSettings(action) {
		const url = `${this.baseUrl}/${action}`
		const settings = {
			url,
			crossDomain: true,
			headers: this.getHeaders(),
			responseType: 'json'
		}

		return settings
	}

	getAjaxPostSettings(action, data) {
		const settings = this.getAjaxSettings(action)
		settings.method = 'POST'
		settings.body = data
		return settings
	}

	getAjaxGetSettings(action) {
		const settings = this.getAjaxSettings(action)
		settings.method = 'GET'
		return settings
	}

	getHeaders() {
		const headers = { 'Content-Type': 'application/json' }
		const token = this.getToken()
		if (token) {
			headers.Authorization = `Bearer ${token}`
		}
		return headers
	}

	checkErrorFor401 = (err) => {
		if (err.status === 401)
			this.deleteToken()

		return Observable.throw(err)
	}

	post(action, data) {
		return ajax(this.getAjaxPostSettings(action, data))
			.catch(this.checkErrorFor401)
	}

	get(action) {
		return ajax(this.getAjaxGetSettings(action))
			.catch(this.checkErrorFor401)
	}
}

export default BaseService