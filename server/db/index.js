const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const {
	credentialsSchema,
	userSchema,
	companySchema,
	projectSchema
} = require('./schemas')

class Database {

	constructor({ mongoDbUri, mongoDbUser, mongoDbPass }) {
		this.mongoDbUri = mongoDbUri
		this.mongoDbUser = mongoDbUser
		this.mongoDbPass = mongoDbPass

		this.Company = mongoose.model('Company', companySchema)
		this.Project = mongoose.model('Project', projectSchema)
		this.User = mongoose.model('User', userSchema)
		this.Credentials = mongoose.model('Credentials', credentialsSchema)
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
