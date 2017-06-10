const STATUS_SUCCESS = 'success'

class BaseService {
	constructor({ db, prefix }) {
		this.db = db
		this.prefix = prefix
	}
	
	getPath(path) {
		return `/${this.prefix}${path}`
	}

	success(data) {
		return { status: STATUS_SUCCESS, data }
	}

}

module.exports = BaseService