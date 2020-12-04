const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const playerSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		require: true
	},
	email: {
		type: String,
		unique: true,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	positionX: Number,
	positionY: Number
});

module.exports = mongoose.model('Players', playerSchema);