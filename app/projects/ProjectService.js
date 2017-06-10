import { Observable } from 'rxjs/Observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/empty'
import BaseService from '../common/BaseService'

class ProjectService extends BaseService {

	constructor() {
		super('projects')
	}
	
	getProjects() {
		return this.get('list')
	}
	
	createNewProject(name) {
		return this.post('', { name })
	}
	
}

export default ProjectService