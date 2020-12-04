const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const uuid = require('uuid');
const authenticate = require('../middleware/authenticate');


router.get('/:id', async (req, res) => {
	try{
		const game = await Game.findById(req.params.id);
		res.locals.game = JSON.stringify(game);
		res.render("game");
	} catch (err){
		res.json({message: err});
	}
});

router.get('/:id/turn', async (req, res) => {
	try{
		const game = await Game.findById(req.params.id);
		turn = game.turn;
		res.json(turn);
	} catch (err){
		res.json({message: err});
	}
});

router.route("/:id/updateTurn").put(function(req, res) {
  Game.updateOne({ _id: req.params.id }, { turn: 2 }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

router.route("/:id/updatePlayerPosition/:x/:y").put(function(req, res) {
	Game.updateOne({_id: req.params.id},{player1X : req.params.x, player1Y : req.params.y}, function(
		err, result) {
		if (err) {
			res.send(err);
		}else{
			res.json(result);
		}
	});
});

router.get('/', (req, res) => {
	res.render("game");
});

router.post('/create/:gameName/:numPlayers', async (req, res) => {

	const tiles = [];

	for(i = 0; i < 25; i++){
		for(j = 0; j < 25; j++){
			if(i >= 0 && i <= 5 && j >= 0 && j <= 4){
				location = "K"; //Kitchen
			}else if(i >= 10 && i <= 14 && j >= 0 && j <= 1){
				location = "BA"; //Ball Room
			}else if(i >= 8 && i <= 16 && j >= 2 && j <= 5){
				location = "BA";
			}else if(i >= 9 && i <= 14 && j == 6){
				location = "BA";
			}else if(i >= 19 && i <= 24 && j >= 0 && j <= 4){
				location = "C"; //Conservatory
			}else if(i >= 0 && i <= 5 && j >= 7 && j <= 12){
				location = "D"; //Dining Room
			}else if(i == 6 && j >= 8 && j <= 11){
				location = "D";
			}else if(i >= 0 && i <= 6 && j >= 13 && j <= 17){
				location = "T"; //Trophy Room
			}else if(i == 7 && j >= 14 && j <= 16){
				location = "T";
			}else if(i >= 0 && i <= 5 && j >= 20 && j <= 24){
				location = "LG"; //Lounge
			}else if(i == 6 && j >= 21 && j <= 24){
				location = "LG";
			}else if(i == 9 && j >= 20 && j <= 22){
				location = "H"; //Hall
			}else if(i >= 10 && i <= 14 && j >= 18 && j <= 24){
				location = "H";
			}else if(i == 15 && j >= 20 && j <= 22){
				location = "H";
			}else if(i == 18 && j >= 21 && j <= 24){
				location = "S"; //Study
			}else if(i >= 19 && i <= 24 && j >= 20 && j <= 24){
				location = "S";
			}else if(i == 17 && j >= 14 && j <= 16){
				location = "LB"; //Library
			}else if(i >= 18 && i <= 24 && j >= 13 && j <= 17){
				location = "LB";
			}else if(i == 18 && j >= 8 && j <= 11){
				location = "BL"; //Billiard Room
			}else if(i >= 19 && i <= 24 && j >= 7 && j <= 11){
				location = "BL"; //Billiard Room
			}else if(i >= 19 && i <= 24 && j >= 0 && j <= 4){
				location = "C"; //Conservatory 
			}else if(i >= 10 && i <= 14 && j >= 9 && j <= 15){
				location = "NA"; //Can't walk
			}else{
				location = "P"//Pathway
			}

			tiles.push({
				"id": "tile-"+i+"-"+j,
				"location": location
			});
		}
	}

	try{
		const game = new Game({
			name: req.params.gameName,
			player_count: req.params.numPlayers,
			turn: "1",
			tiles: tiles,
			player1X: 9,
			player1Y: 24
		});

		game.save().then(data => {
			res.json(game.id);
		}).catch(err => {
			res.json(err);
		});
	}catch(err){
		res.json({message:err});
	}

});

module.exports = router;