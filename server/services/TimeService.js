const BaseService = require('./BaseService')
const Moment = require('moment')
const { extendMoment } = require('moment-range')
const moment = extendMoment(Moment)

class TimeService extends BaseService {
	
	async fetchEntriesFromDb({ userId, week, month, year }) {

		const entries = await this.db.TimeEntry
			.find({ _user: userId, week, year, month, removed: false }, '_id _projectId week year month days')

		return entries
	}

	async getEntries(ctx) {
		const { userId } = ctx.state
		const { week, month, year } = ctx.request.query

		const entries = await this.fetchEntriesFromDb({ userId, week, month, year })

		ctx.body = this.success({ entries })
	}

	async saveEntry(ctx) {
		const { userId } = ctx.state
		const { id, projectId, week, month, year, values } = ctx.request.body
		console.log({ id, projectId, week, month, year, values })
		if (id) {
			const entry = await this.db.TimeEntry.findOne({ _id: id, _user: userId, removed: false })
			entry._projectId = projectId
			entry.days = values
			await entry.save()
		}
		else {

			/*
			const periodStart = moment({ year, month, day: startDay })
			const periodEnd = moment({ year, month, day: endDay })

			const weekRange = moment.range(periodStart, periodEnd)
			const days = []

			for (const date of weekRange.by('day')) {
				days.push({
					dayOfMonth: date.date(),
					amount: 0
				})
			*/
			await this.db.TimeEntry.create({ _user: userId, _project: projectId, days: values, week, year, month })
		}

		const entries = await this.fetchEntriesFromDb({ userId, week, month, year })

		ctx.body = this.success({ entries })
	}

	async removeEntry(ctx) {
		const { userId } = ctx.state
		const { id, week, month, year } = ctx.request.body

		if (id) {
			const entry = await this.db.TimeEntry.remove({ _id: id, _user: userId })
		}

		const entries = await this.fetchEntriesFromDb({ userId, week, month, year })

		ctx.body = this.success({ entries })
	}

	setupRoutes(router) {
		router
			.get(this.getPath('/list'), this.authorize(), this.getEntries.bind(this))
			.post(this.getPath('/'), this.authorize(), this.saveEntry.bind(this))
			.delete(this.getPath('/'), this.authorize(), this.removeEntry.bind(this))
	}
	
}


module.exports = TimeService