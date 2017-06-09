const mongoose = require('mongoose')
const { profileSchema, userSchema } = require('./schemas')

class Database {

	constructor({ mongoDbUri, mongoDbUser, mongoDbPass }) {
		this.mongoDbUri = mongoDbUri
		this.mongoDbUser = mongoDbUser
		this.mongoDbPass = mongoDbPass

		this.User = mongoose.model('User', userSchema)
		this.Profile = mongoose.model('Profile', profileSchema)
	}

	async connect() {
		const options = {
			user: this.mongoDbUser,
			pass: this.mongoDbPass
		}

		await mongoose.connect(this.mongoDbUri, options)
	}
}

module.exports.Database = Database
