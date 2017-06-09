const BaseService = require('./BaseService')

class ReportService extends BaseService {
	
	async authenticate(ctx) {
		const { username, password } = ctx.request.body
		if (password === 'xxx') {
			ctx.throw(401)
		}
		ctx.body = 'SUCCESS'
	}

	async authorize(ctx) {
		// console.log(this.db)
		const user = new this.db.User({ usernamezz: 'Whasfd', password: '12345dsd' })
		const newUser = await user.save()
		
		const profile = new this.db.Profile({ _userId: newUser.id, firstname: 'first', lastname: 'last' })
		const newProfile = await profile.save()

		ctx.body = newProfile
	}

	setupRoutes(router) {
		router
			.post('/authenticate', this.authenticate.bind(this))
			.get('/authorize', this.authorize.bind(this))
	}
	
}


module.exports = ReportService