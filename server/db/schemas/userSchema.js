const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
	_credentials: { type: Schema.Types.ObjectId, ref: 'Credentials' },
	_company: { type: Schema.Types.ObjectId, ref: 'Company' },
	_projects: { type: Schema.Types.ObjectId, ref: 'Project' },
	username: String,
	email: String,
	firstname: String,
	lastname: String,
	role: String,
	removed: { type: Boolean, default: false }
})