import { Observable } from 'rxjs/Observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/empty'
import BaseService from '../BaseService'

class ChaptersService extends BaseService {

	constructor() {
		super('auth')
	}

	signIn({ username, password }) {
		return this.post('authenticate', { username, password })
				.do((successResponse) => { this.setToken(successResponse.response.data.token) })
	}

	signOut = () => {
		this.deleteToken()
	}
}

export default ChaptersService