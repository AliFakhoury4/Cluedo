const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	player_count: {
		type: Number,
		require: true
	},
	turn: {
		type: String,
		required: true
	},
	players: {
		type: Array,
	},
	date_created: {
		type: Date,
		default: Date.now
	},
	tiles: [{
		id:{
			type: String,
			required: true
		},
		location: {
			type: String,
			required: true
		}
	}],
	player1X: Number,
	player1Y: Number
});

module.exports = mongoose.model('Games', gameSchema);