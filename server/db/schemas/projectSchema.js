const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
	_company: { type: Schema.Types.ObjectId, ref: 'Company' },
	name: String
})