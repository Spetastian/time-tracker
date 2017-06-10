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
	
	getEntries(weekNumber) {
		return this.get(weekNumber)
	}
	
	createNewEntry({ weekNumber, projectId }) {
		return this.post(weekNumber, { projectId })
	}
	
	saveEntry({ id, weekNumber }) {
		return this.post(weekNumber, { id })
	}
	
	removeEntry({ id, weekNumber }) {
		return this.delete(weekNumber, { id })
	}
	
}

export default TimeService