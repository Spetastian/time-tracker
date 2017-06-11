import { Observable } from 'rxjs/Observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/empty'
import BaseService from '../common/BaseService'

class TimeService extends BaseService {

	constructor() {
		super('time')
	}
	
	getEntries({ week, year, month }) {
		return this.get('', { week, year, month })
	}
	
	createNewEntry({ week, year, month, projectId }) {
		return this.post('', { week, year, month, projectId })
	}
	
	saveEntry({ id }) {
		return this.post('', { id })
	}
	
	removeEntry({ id, week }) {
		return this.delete(week, { id })
	}
	
}

export default TimeService