const BaseService = require('./BaseService')

class ProjectService extends BaseService {
	
	async getProjects(ctx) {
		ctx.body = this.success({ projects: [] })
	}

	async saveProject(ctx) {
		ctx.body = 'saveProject'
	}

	setupRoutes(router) {
		router
			.get(this.getPath('/list'), this.getProjects.bind(this))
			.post(this.getPath('/'), this.saveProject.bind(this))
	}
	
}


module.exports = ProjectService