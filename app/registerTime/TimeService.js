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
	
	getEntries({ week, month, year }) {
		return this.get('list', { week, month, year })
	}
	
	createNewEntry({ projectId, week, startDay, endDay, month, year }) {
		return this.post('', { projectId, week, startDay, endDay, month, year })
	}
	
	saveEntry({ id }) {
		return this.post('', { id })
	}
	
	removeEntry({ id, week }) {
		return this.delete(week, { id })
	}
	
}

export default TimeService