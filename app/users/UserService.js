import { Observable } from 'rxjs/Observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/empty'
import BaseService from '../common/BaseService'

class UserService extends BaseService {

	constructor() {
		super('users')
	}
	
	getUsers() {
		return this.get('list')
	}
	
	createNewUser({ username, password, email, firstname, lastname, role }) {
		return this.post('', { username, password, email, firstname, lastname, role })
	}
	
	saveUser({ id, username, email, firstname, lastname, role }) {
		return this.post('', { id, username, email, firstname, lastname, role })
	}
	
	removeUser(id) {
		return this.delete('', { id })
	}
	
}

export default UserService