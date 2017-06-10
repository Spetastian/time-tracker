const BaseService = require('./BaseService')

class ProjectService extends BaseService {
	
	async getProjects(ctx) {
		const { companyId } = ctx.state
		const projects = await this.db.Project
			.find({ _company: companyId, removed: false }, '_id name')

		ctx.body = this.success({ projects })
	}

	async saveProject(ctx) {
		const { companyId } = ctx.state
		const { id, name } = ctx.request.body
		if (id) {
			const project = await this.db.Project.findOne({ _id: id, _company: companyId, removed: false })
			project.name = name
			await project.save()
		}
		else {
			await this.db.Project.create({ _company: companyId, name })
		}
		
		await this.getProjects(ctx)
	}

	async removeProject(ctx) {
		const { companyId } = ctx.state
		const { id } = ctx.request.body
		if (id) {
			const project = await this.db.Project.findOne({ _id: id, _company: companyId, removed: false })
			project.removed = true
			await project.save()
		}

		await this.getProjects(ctx)
	}

	setupRoutes(router) {
		router
			.get(this.getPath('/list'), this.authorize(), this.getProjects.bind(this))
			.post(this.getPath('/'), this.authorize(), this.saveProject.bind(this))
			.delete(this.getPath('/'), this.authorize(), this.removeProject.bind(this))
	}
	
}


module.exports = ProjectService