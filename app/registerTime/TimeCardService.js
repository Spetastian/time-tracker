import { Observable } from 'rxjs/Observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/empty'

class TimeCardService {

	constructor() {
		this.authUrl = ''
	}
	
	getTimeCard({ weekNumber }) {
		return ajax.get(`${this.authUrl}/timecard/${weekNumber}`, { 'Content-Type': 'application/json' })
	}
	
	addEntry({ weekNumber, projectId }) {
		console.log({ weekNumber, projectId })
		return ajax.post(`${this.authUrl}/timecard/${weekNumber}/add`, { projectId }, { 'Content-Type': 'application/json' })
	}
	
	save({ weekNumber, entries }) {
		return ajax.post(`${this.authUrl}/timecard/${weekNumber}/save`, { entries }, { 'Content-Type': 'application/json' })
	}

}

export default TimeCardService