import { Observable } from 'rxjs/Observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/empty'

class ProjectService {

	constructor() {
		this.baseUrl = ''
	}
	
	getProjects() {
		return ajax.get(`${this.baseUrl}/projects/list`, { 'Content-Type': 'application/json' })
	}
	
	createNewProject(name) {
		return ajax.post(`${this.baseUrl}/projects`, { name }, { 'Content-Type': 'application/json' })
	}
	

}

export default ProjectService