const BaseService = require('./BaseService')
const Moment = require('moment')
const { extendMoment } = require('moment-range')
const moment = extendMoment(Moment)

class TimeService extends BaseService {
	
	async getEntries(ctx) {
		const { userId } = ctx.state
		const { week, month, year } = ctx.request.body

		const entries = await this.db.TimeEntry
			.find({ _user: userId, removed: false, week, year, month }, '_id _projectId week year month days')

		ctx.body = this.success({ entries })
	}

	async saveEntry(ctx) {
		const { userId } = ctx.state
		const { id, projectId, week, startDay, endDay, month, year } = ctx.request.body
		if (id) {
			const project = await this.db.TimeEntry.findOne({ _id: id, _user: userId, removed: false })
			project._projectId = projectId
			await project.save()
		}
		else {
			console.log({ startDay, endDay })
			const periodStart = moment({ year, month, day: startDay })
			const periodEnd = moment({ year, month, day: endDay })

			const weekRange = moment.range(periodStart, periodEnd)
			const days = []

			for (const date of weekRange.by('day')) {
				days.push({
					dayOfMonth: date.date(),
					amount: 0
				})
			}

			console.log(days)
			await this.db.TimeEntry.create({ _user: userId, _project: projectId, days, week, year, month })
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