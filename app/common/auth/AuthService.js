import { Observable } from 'rxjs/Observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/empty'
import cookies from 'js-cookie'

class ChaptersService {

	constructor() {
		this.baseUrl = '/auth'
	}

	getSigninRequestOpts({ username, password }) {
		return {
			url: `${this.authUrl}/signin`,
			method: 'GET',
			responseType: 'json',
			data: {
				username,
				password
			}
		}
	}

	getAuthenticationRequestOpts() {
		return {
			url: `${this.baseUrl}/authenticate`,
			method: 'GET',
			responseType: 'json'
		}
	}

	setToken(token) {
		cookies.set('token', token)
	}

	deleteToken() {
		cookies.remove('token')
	}

	verifyToken() {
		console.log('verifyToken')
		if (!cookies.get('token'))
			return Observable.throw(new Error('Token not found'))

		return Observable.of(true)
	}

	signIn({ username, password }) {
		return ajax.post(`${this.baseUrl}/authenticate`, { username, password }, { 'Content-Type': 'application/json' })
				.do((successResponse) => { this.setToken(successResponse.response.token) })
	}

	authenticate() {
		return ajax(this.getAuthenticationRequestOpts())
				.catch((errorResponse) => {
					if (errorResponse.status === 403)
						this.deleteToken()

					return Observable.throw(errorResponse)
				})
	}

	signOut() {
		
	}
}

export default ChaptersService