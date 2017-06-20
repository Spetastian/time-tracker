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
		return this.get(`list?week=${week}&month=${month}&year=${year}`)
	}
	
	createNewEntry({ projectId, week, values, month, year }) {
		return this.post('', { projectId, week, values, month, year })
	}
	
	saveEntry({ id, projectId, values }) {
		return this.post('', { id, projectId, values })
	}
	
	removeEntry({ id, week, month, year }) {
		return this.delete('', { id, week, month, year })
	}
	
}

export default TimeService