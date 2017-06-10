const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	password: String
})