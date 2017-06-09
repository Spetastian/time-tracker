class BaseService {
	constructor({ db, prefix }) {
		this.db = db
		this.prefix = prefix
	}
	
	getPath(path) {
		return `/${this.prefix}${path}`
	}
}

module.exports = BaseService