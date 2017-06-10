const BaseService = require('./BaseService')
const { createToken, verifyPassword } = require('../utils/security')

class AuthService extends BaseService {

	async authenticate(ctx) {
		try {

			const { username, password } = ctx.request.body

			const user = await this.db.User
				.findOne({ username })
				.populate('_company _credentials')
			if (!user) throw new Error('User was not found in the database')
			
			await verifyPassword(password, user._credentials.password)

			const {
				id: userId,
				email,
				firstname,
				lastname,
				role,
				_company: {
					id: companyId,
					name: companyName
				}
			} = user

			const token = createToken({ companyId, userId, role })
			ctx.body = this.success({ token, companyName, email, firstname, lastname })
		}
		catch (err) {
			console.error(err)
			ctx.throw(401, 'Authentication failed')
		}
	}

	setupRoutes(router) {
		router
			.post(this.getPath('/authenticate'), this.authenticate.bind(this))
	}
	
}


module.exports = AuthService