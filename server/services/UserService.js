const BaseService = require('./BaseService')

class UserService extends BaseService {

	async getList(ctx) {
		ctx.body = 'SUCCESS'
	}

	async create(ctx) {
		const { username, password, firstname, lastname, email } = ctx.request.body

		const newUser = await this.db.User.create({ username, password })
		const newProfile = await this.db.Profile.create({ _user: newUser.id, firstname, lastname, email })
		
		ctx.body = Object.assign(newProfile, { username: newUser.userName })
	}

	setupRoutes(router) {
		router
			.post(this.getPath('/'), this.create.bind(this))
			.get(this.getPath('/list'), this.getList.bind(this))
	}
	
}


module.exports = UserService