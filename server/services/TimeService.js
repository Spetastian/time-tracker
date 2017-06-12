const BaseService = require('./BaseService')
const moment = require('moment')

class TimeService extends BaseService {
	
	async getEntries(ctx) {
		const { userId } = ctx.state
		const { week, year, month } = ctx.request.body

		const entries = await this.db.TimeEntry
			.find({ _user: userId, removed: false, week, year, month }, '_id _projectId week year month')

		ctx.body = this.success({ entries })
	}

	async saveEntry(ctx) {
		const { userId } = ctx.state
		const { id, week, year, month, projectId } = ctx.request.body
		if (id) {
			const project = await this.db.TimeEntry.findOne({ _id: id, _user: userId, removed: false })
			project._projectId = projectId
			await project.save()
		}
		else {
			const period = moment({ year, month, week })
			await this.db.TimeEntry.create({ _user: userId, _project: projectId, week, year, month })
		}
		
		await this.getEntries(ctx)
	}

	async removeEntry(ctx) {
		const { userId } = ctx.state
		const { id } = ctx.request.body
		if (id) {
			const project = await this.db.TimeEntry.findOne({ _id: id, _user: userId, removed: false })
			project.removed = true
			await project.save()
		}

		await this.getEntries(ctx)
	}

	setupRoutes(router) {
		router
			.get(this.getPath('/list'), this.authorize(), this.getEntries.bind(this))
			.post(this.getPath('/'), this.authorize(), this.saveEntry.bind(this))
			.delete(this.getPath('/'), this.authorize(), this.removeEntry.bind(this))
	}
	
}


module.exports = TimeService