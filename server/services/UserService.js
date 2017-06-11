const BaseService = require('./BaseService')
const { hashPassword } = require('../utils/security')

class ProjectService extends BaseService {
	
	async getUsers(ctx) {
		const { companyId } = ctx.state
		const users = await this.db.User
			.find({ _company: companyId, removed: false }, '_id username email firstname lastname role')

		ctx.body = this.success({ users })
	}

	async saveUser(ctx) {
		const { companyId } = ctx.state
		const { id, username, password, email, firstname, lastname, role } = ctx.request.body
		if (id) {
			const user = await this.db.User.findOne({ _id: id, _company: companyId, removed: false })
			user.username = username
			user.email = email
			user.firstname = firstname
			user.lastname = lastname
			user.role = role
			await user.save()
		}
		else {
			const hashedPassword = await hashPassword(password)
			const credentials = await this.db.Credentials.create({ password: hashedPassword })
			await this.db.User.create({ _company: companyId, _credentials: credentials._id, username, email, firstname, lastname, role })
		}
		
		await this.getUsers(ctx)
	}

	async removeUser(ctx) {
		const { companyId } = ctx.state
		const { id } = ctx.request.body
		if (id) {
			const user = await this.db.User.findOne({ _id: id, _company: companyId, removed: false })
			user.removed = true
			await user.save()
		}

		await this.getUsers(ctx)
	}

	setupRoutes(router) {
		router
			.get(this.getPath('/list'), this.authorize(), this.getUsers.bind(this))
			.post(this.getPath('/'), this.authorize(), this.saveUser.bind(this))
			.delete(this.getPath('/'), this.authorize(), this.removeUser.bind(this))
	}
	
}


module.exports = ProjectService