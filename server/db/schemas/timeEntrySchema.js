const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	_project: { type: Schema.Types.ObjectId, ref: 'Project' },
	slug: String,
	week: Number,
	month: Number,
	year: Number,
	days: [{
		date: String,
		amount: Number
	}],
	removed: { type: Boolean, default: false }
})