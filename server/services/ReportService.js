const BaseService = require('./BaseService')

class ReportService extends BaseService {

	async getReports(ctx) {
		const { companyId } = ctx.state
		const { week, month, year } = ctx.request.query

		const reports = await this.db.TimeEntry
			.find({
				week, month, year
			})
			.populate({
				path: '_user',
				match: { _company: companyId },
				select: '_id firstname lastname'
			})

		ctx.body = this.success({ reports })
	}

	setupRoutes(router) {
		router
			.get(this.getPath('/list'), this.authorize(), this.getReports.bind(this))
	}

}


module.exports = ReportService