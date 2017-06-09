import { Observable } from 'rxjs/Observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/empty'

class UserService {

	constructor() {
		this.baseUrl = ''
	}
	
	getUsers() {
		return ajax.get(`${this.baseUrl}/users/list`, { 'Content-Type': 'application/json' })
	}
	

}

export default UserService