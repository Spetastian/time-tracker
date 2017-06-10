const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
	name: String,
	removed: { type: Boolean, default: false }
})