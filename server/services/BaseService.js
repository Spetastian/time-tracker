const { hasAccess } = require('../utils/security')
const STATUS_SUCCESS = 'success'

class BaseService {
	constructor({ db, area }) {
		this.db = db
		this.area = area
		this.authorize = this.authorize.bind(this)
	}

	authorize() {
		return async (ctx, next) => {
			const { userRole } = ctx.state
			if (hasAccess(this.area, userRole))
				await next()
			else {
				ctx.status = 403
				ctx.body = 'Access denied!'
			}
		}
	}
	
	getPath(path) {
		return `/${this.area}${path}`
	}

	success(data) {
		return { status: STATUS_SUCCESS, data }
	}

}

module.exports = BaseService