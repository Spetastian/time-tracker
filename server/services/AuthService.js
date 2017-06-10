const BaseService = require('./BaseService')
const nJwt = require('njwt')
const secureRandom = require('secure-random')
const signingKey = secureRandom(256, { type: 'Buffer' })

class AuthService extends BaseService {

	async authenticate(ctx) {
		const { username, password } = ctx.request.body
		if (password === 'xxx') {
			ctx.throw(401)
		}

		const claims = {
			iss: 'http://localhost:3000',  // The URL of your service
			sub: username,    // The UID of the user in your system
			scope: 'self'
		}

		const jwt = nJwt.create(claims, signingKey)
		jwt.setExpiration(new Date().getTime() + 60 * 60 * 1000) // One hour from now

		ctx.body = this.success({ token: jwt.compact() })
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
			.post(this.getPath('/authenticate'), this.authenticate.bind(this))
			.get(this.getPath('/authorize'), this.authorize.bind(this))
	}
	
}


module.exports = AuthService